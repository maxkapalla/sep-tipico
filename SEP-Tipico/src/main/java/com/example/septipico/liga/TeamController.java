package com.example.septipico.liga;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@Service
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/team")
public class TeamController {
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    LigaRepository ligaRepository;

    Random ran = new Random();
    @PostMapping("/name")
    public List<Team> findByName(@RequestBody Team team) {

        for (Team t : teamRepository.findByName(team.getName())) {
            System.out.println(t.getName());
        }


        return teamRepository.findByName(team.getName());
    }


    @PostMapping("/ids")
    public List<Team> getTeams(@RequestBody List<Long> ids) {
        List<Team> t = teamRepository.findAllById(ids);
        return t;
    }

    @PostMapping("/id")
    public Optional<Team> getTeam(@RequestBody Team team) {

        Optional<Team> t = teamRepository.findById(team.getId());
        return t;
    }


    @PostMapping("/delete")
    public void deleteTeam(@RequestBody Team team) {

        teamRepository.deleteById(team.getId());
    }

    @PostMapping("/save")
    public void saveTeam(@RequestBody Team team) {
        team.setTeamid(ran.nextLong(9999999999L));
        team.setPoints(0);
        teamRepository.save(team);
    }

    @PostMapping("/save/name")
    public void saveTeamByName(@RequestBody Team team) {
        if (team.getLiga() == null) {
            team.setLiga(0L);
        }

        if (teamRepository.findByName(team.getName()).isEmpty()) {
            System.out.println("empty");
            team.setTeamid(ran.nextLong(9999999999L));
            teamRepository.save(team);
        } else {
            List<Team> teamList = teamRepository.findByName(team.getName());
            boolean exisits = false;
            for (Team t : teamList) {
                if (t.getLiga().compareTo(team.getLiga()) == 0) {
                    exisits = true;
                    break;
                }
            }
            if (!exisits) {
                team.setTeamid(ran.nextLong(9999999999L));
                teamRepository.save(team);
            }

        }


    }

    @PostMapping("/all")
    public List<Team> getAllTeams() {

        return teamRepository.findAll();
    }

    @GetMapping ("/all")
    List<Team> getAll(){
        return teamRepository.findAll();
    }

    @PostMapping("/all/liga")
    public List<Team> getAllTeamsInLiga(@RequestBody String ligaS) {

        Long liga = Long.parseLong(ligaS);
        return teamRepository.findByLiga(liga);
    }

    @GetMapping("/flush")
    public void flush() {
        teamRepository.deleteAll();
    }

    @GetMapping("/random")
    public void randomCreate() {
        int max = 1000;
        int min = 0;


        List<Liga> ligaList = new ArrayList<Liga>();
        ligaList = ligaRepository.findAll();

        if (ligaList.isEmpty()) {

            for (int i = 0; i < 3; i++) {
                Liga l = new Liga("Testliga" + (int) ((Math.random() * (max - min)) + min));
                ligaList.add(l);

            }

            ligaRepository.saveAll(ligaList);
            ligaList = ligaRepository.findAll();

        }

        int ligaSize = ligaList.size();

        List<Team> teamList = new ArrayList<Team>();
        List<Team> newTeamList = new ArrayList<Team>();


        for (Liga liga : ligaList) {
            teamList = teamRepository.findByLiga(liga.getId());
            if (teamList.size() < 18) {
                for (int i = 0; i < 18 - teamList.size(); i++) {
                    Team t = new Team();
                    t.setName("Team" + (int) ((Math.random() * (max - min)) + min));
                    t.setPoints((int) ((Math.random() * (max - min)) + min));
                    t.setGoals((int) ((Math.random() * (max - min)) + min));
                    t.setDraws((int) ((Math.random() * (max - min)) + min));
                    t.setLosses((int) ((Math.random() * (max - min)) + min));
                    t.setWinnings((int) ((Math.random() * (max - min)) + min));
                    int ligaIndex = (int) ((Math.random() * (ligaSize)) + 0);
                    t.setLiga(ligaList.get(ligaIndex).getId());
                    newTeamList.add(t);
                }
            }
        }


        teamRepository.saveAll(newTeamList);
    }

}
