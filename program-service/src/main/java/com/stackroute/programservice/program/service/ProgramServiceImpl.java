package com.stackroute.programservice.program.service;

import com.stackroute.programservice.program.exception.ProgramNotFoundException;
import com.stackroute.programservice.program.model.DatabaseSequence;
import com.stackroute.programservice.program.model.Member;
import com.stackroute.programservice.program.model.Program;
import com.stackroute.programservice.program.model.ProgramStatus;
import com.stackroute.programservice.program.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class ProgramServiceImpl implements ProgramService {

    private final ProgramRepository programRepository;
    private final MongoTemplate mongoTemplate;
    private final MongoOperations mongoOperations;

    @Autowired
    public ProgramServiceImpl(ProgramRepository programRepository, MongoTemplate mongoTemplate, MongoOperations mongoOperations) {
        this.programRepository = programRepository;
        this.mongoTemplate = mongoTemplate;
        this.mongoOperations = mongoOperations;
    }

    @Override
    public long generateSequence(String sequenceName) {
        DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(sequenceName)),
                new Update().inc("sequence", 1), options().returnNew(true).upsert(true), DatabaseSequence.class);

        return !Objects.isNull(counter) ? counter.getSequence() : 1;
    }

    @Override
    public Program getProgramByName(String programName) {
        return programRepository.findByProgramName(programName);
    }

    @Override
    public Program addProgram(Program program) {
        return programRepository.save(program);
    }

    @Override
    public List<Program> getAllPrograms() throws ParseException {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "createdOn"));

        List<Program> programList = mongoTemplate.find(query, Program.class);

        for (Program program : programList) {

            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date today = simpleDateFormat.parse(simpleDateFormat.format(new Date()));
            long todayInMillis = today.getTime();

            if ((program.getStartDate() < System.currentTimeMillis() || program.getStartDate() == todayInMillis) && program.getEndDate() > System.currentTimeMillis() || program.getEndDate() == todayInMillis) {
                program.setProgramStatus(ProgramStatus.ACTIVE);
            } else {
                program.setProgramStatus(ProgramStatus.INACTIVE);
            }
        }

        programRepository.saveAll(programList);
        return programList;
    }

    @Override
    public List<Program> getAllActiveProgramsOnParticularDate(String memberEmail, long dateInMillis) {

        List<Program> programList = programRepository.findAll();
        List<Program> allActivePrograms = new ArrayList<>();

        for (Program program : programList) {

            if ((dateInMillis > program.getStartDate() || program.getStartDate() == dateInMillis) && (dateInMillis < program.getEndDate() || program.getEndDate() == dateInMillis)) {
                List<Member> programMembers = program.getMembersList();

                if (programMembers != null) {
                    programMembers.forEach(member -> {
                        if (member.getMemberEmailId().equals(memberEmail)) {
                            allActivePrograms.add(program);
                        }
                    });
                }
            }
        }

        return allActivePrograms;
    }

    @Override
    public List<Program> getProgramByManager(String managerEmail) {

        Query query = new Query();
        query.addCriteria(where("managerEmailId").is(managerEmail)).with(Sort.by(Sort.Direction.DESC, "createdOn"));
        return mongoTemplate.find(query, Program.class);

    }

    @Override
    public String deleteProgram(String programName) throws ProgramNotFoundException {
        Program program = programRepository.findByProgramName(programName);

        if (program != null) {
            programRepository.delete(program);
            return "Program Deleted.";
        } else {
            throw new ProgramNotFoundException();
        }
    }

    @Override
    public Program addMembersToProgram(String programName, List<String> memberList) throws ProgramNotFoundException {

        Program savedProgram = programRepository.findByProgramName(programName);
        List<Member> addMembersList = new ArrayList<>();

        if (savedProgram != null) {

            memberList.forEach(m -> {
                Member member = new Member();
                member.setMemberEmailId(m);
                member.setStartDate(savedProgram.getStartDate());
                member.setEndDate(savedProgram.getEndDate());
                addMembersList.add(member);
            });

            List<Member> existingMembersList = new ArrayList<>(savedProgram.getMembersList());
            Set<Member> memberSet = new HashSet<>(existingMembersList);

            memberSet.addAll(addMembersList);

            List<Member> finalMemberList = new ArrayList<>(memberSet);

            savedProgram.setMembersList(finalMemberList);
            return programRepository.save(savedProgram);

        } else {
            throw new ProgramNotFoundException();
        }
    }

    @Override
    public Program removeMembersFromProgram(String programName, String memberEmail) throws ProgramNotFoundException {

        Program savedProgram = programRepository.findByProgramName(programName);

        if (savedProgram != null) {
            List<Member> memberList = savedProgram.getMembersList();

            for (int i = 0; i < memberList.size(); i++) {
                if (memberList.get(i).getMemberEmailId().equals(memberEmail)) {
                    memberList.remove(i);
                    break;
                }
            }
            savedProgram.setMembersList(memberList);

            return programRepository.save(savedProgram);
        } else {
            throw new ProgramNotFoundException();
        }
    }

    @Override
    public List<Program> getProgramByOrganizationName(String organizationName) {
        Query query = new Query();
        query.addCriteria(where("organizationName").is(organizationName));
        return mongoTemplate.find(query, Program.class);
    }

    @Override
    public List<Program> getProgramByStatus(String programStatus) {
        Query query = new Query();
        query.addCriteria(where("programStatus").is(programStatus));
        return mongoTemplate.find(query, Program.class);
    }

    @Override
    public List<Program> searchPrograms(Program program, String searchDate) {

        Query query = new Query();

        System.out.println(program);
        if (program.getProgramName() != null) {

            query.addCriteria(where("programName").regex("^" + program.getProgramName()));
        }

        if (program.getOrganizationName() != null) {
            query.addCriteria(where("organizationName").is(program.getOrganizationName()));
        }

        if (program.getManagerEmailId() != null) {
            query.addCriteria(where("managerEmailId").is(program.getManagerEmailId()));
        }

        if (searchDate != null) {
            long dateSearch = Long.parseLong(searchDate);

            query.addCriteria(where("startDate").lte(dateSearch));
            query.addCriteria(where("endDate").gte(dateSearch));
        }

        if(program.getProgramStatus() != null){
            query.addCriteria(where("programStatus").is(program.getProgramStatus()));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdOn"));
        return mongoTemplate.find(query, Program.class);
    }

    @Override
    public List<Program> searchProgramsForManager(String managerEmail, Program program, String searchDate) {

        Query query = new Query();

        query.addCriteria(where("managerEmailId").is(managerEmail));

        if (program.getProgramName() != null) {
            query.addCriteria(where("programName").regex("^" + program.getProgramName()));
        }

        if (program.getOrganizationName() != null) {
            query.addCriteria(where("organizationName").is(program.getOrganizationName()));
        }

        if(program.getProgramStatus() != null){
            query.addCriteria(where("programStatus").is(program.getProgramStatus()));
        }

        if (searchDate != null) {
            long dateSearch = Long.parseLong(searchDate);

            query.addCriteria(where("startDate").lte(dateSearch));
            query.addCriteria(where("endDate").gte(dateSearch));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdOn"));
        return mongoTemplate.find(query, Program.class);
    }
}
