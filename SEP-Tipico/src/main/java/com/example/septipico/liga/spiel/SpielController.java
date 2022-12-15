package com.example.septipico.liga.spiel;


import com.example.septipico.liga.Liga;
import com.example.septipico.liga.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/spiel")
public class SpielController {
    @Autowired
    SpielRepository spielRepository;

    @PostMapping("/delete")
    public void deleteSpiel(@RequestBody Spiel spiel) {

        spielRepository.deleteById(spiel.getId());
    }

    @PostMapping("/all")
    public List<Spiel> getAll() {

        return spielRepository.findAll();
    }

    @PostMapping("/save")
    public void saveSpiel(@RequestBody Spiel spiel) {
        spielRepository.save(spiel);

    }

    @PostMapping("/team")
    public List<Spiel> getByTeam(@RequestBody List<Team> teams) {
        List<Long> spielID = new ArrayList<>();
        for (Team team : teams) {
            for (Spiel s : spielRepository.findByTeamA(team.getId())) {
                spielID.add(s.getId());
            }
            for (Spiel s : spielRepository.findByTeamB(team.getId())) {
                spielID.add(s.getId());
            }
        }

        return spielRepository.findAllById(spielID);


    }

    @PostMapping("/liga")
    public List<Spiel> getByLiga(@RequestBody Liga liga) {
        List<Spiel> results = new ArrayList<>();
        results.addAll(spielRepository.findAllByLigaOrderByDate(liga.getId()));
 return results;

    }


    @PostMapping("/ids")
    public List<Spiel> getById(@RequestBody List<Long> ids) {
        return spielRepository.findAllById(ids);

    }


    @PostMapping("/flush")
    public void flushLiga() {
        spielRepository.deleteAll();
    }


    @GetMapping("/all")
    public List<Spiel> getAllGames(){
        return spielRepository.findAll();
    }
}
