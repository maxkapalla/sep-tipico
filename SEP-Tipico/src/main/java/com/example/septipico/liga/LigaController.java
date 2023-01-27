package com.example.septipico.liga;

import com.example.septipico.TippRunde.TippRunde;
import com.example.septipico.TippRunde.TippRundeRepository;
import com.example.septipico.liga.spiel.SpielRepository;
import com.example.septipico.nutzer.NutzerRepository;
import com.example.septipico.tippN.TippNRepository;
import com.example.septipico.tipper.Tipper;
import com.example.septipico.tipper.TipperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/liga")
public class LigaController {

    @Autowired
    private LigaRepository ligaRepository;

    @Autowired
    private TipperRepository tipperRepository;

    @Autowired
    private NutzerRepository nutzerRepository;

    @Autowired
    private TippNRepository tippNRepository;

    @Autowired
    TippRundeRepository tippRundeRepository;

    @Autowired
    SpielRepository spielRepository;

    @Autowired
    TeamRepository teamRepository;


    @PostMapping("/delete")
    public void deleteLiga(@RequestBody Liga liga) {

        ligaRepository.deleteById(liga.getId());
    }

    @Transactional
    @PostMapping("/remove")
    public void removeLiga(@RequestBody Long ligaID) {

        List<TippRunde> runden = tippRundeRepository.findTippRundeByLiga(ligaID);
        for(TippRunde r : runden) {
            tippNRepository.deleteAllByTipprundenid(r.getId());
            tipperRepository.deleteAllByTipprundenID(r.getId());
        }

        teamRepository.deleteAllByLiga(ligaID);
        spielRepository.deleteAllByLiga(ligaID);
        tippRundeRepository.deleteAllByLiga(ligaID);
        ligaRepository.deleteById(ligaID);
    }

    @PostMapping("/save")
    public void saveLiga(@RequestBody Liga liga) {
        ligaRepository.save(liga);

    }

    @PostMapping("/save/new")
    public void newLiga(@RequestBody String liga) {

        Liga l = new Liga();
        l.setId(null);
        l.setName(liga);
        ligaRepository.save(l);

    }

    @PostMapping("/name")
    public List<Liga> getLiga(@RequestBody String name) {
        List<Liga> l = new ArrayList<Liga>();
        l.add(ligaRepository.findByName(name));
        return l;
    }

    @PostMapping("/ids")
    public List<Liga> getLiga(@RequestBody List<Long> ids) {
        List<Liga> l = ligaRepository.findAllById(ids);
        return l;
    }

    @PostMapping("/id/name")
    public String getLigaName(@RequestBody Long id) {
        String l = ligaRepository.findNameById(id);
        return l;
    }

    @GetMapping("/flush")
    public void flushLiga() {
        ligaRepository.deleteAll();
    }

    @GetMapping("/random")
    public void randomCreate() {
        int max = 10000;
        int min = 0;

        List<Liga> ligaList = new ArrayList<Liga>();

        for (int i = 0; i < 3; i++) {
            Liga l = new Liga("Testliga" + (int) ((Math.random() * (max - min)) + min));
            ligaList.add(l);

        }

        ligaRepository.saveAll(ligaList);
    }

    @GetMapping("/all")
    public List<Liga> getLiga() {
        return ligaRepository.findAll();
    }

    @GetMapping("/adminstats")
    public List<AdminStats> getAdminStats() {
        List<AdminStats> adminStats = new ArrayList<>();
        List<Liga> ligaList = ligaRepository.findAll();

        for(Liga l : ligaList) {
            AdminStats statsObj = new AdminStats();
            statsObj.setLigaID(l.getId());
            statsObj.setLigaName(l.getName());

            List<TippRunde> runden = tippRundeRepository.findTippRundeByLiga(l.getId());

            statsObj.setTippRundenCount(runden.size());

            List<Tipper> tippers = new ArrayList<>();
            for(TippRunde r : runden) {
                tippers.addAll(tipperRepository.findAllByTipprundenID(r.getId()));
            }
            List<Long> userIDs = new ArrayList<Long>();

            for(Tipper t : tippers) {
                if (!userIDs.contains(t.getId())) {
                    userIDs.add(t.getId());
                }
            }
            statsObj.setUserCount(userIDs.size());

            adminStats.add(statsObj);
        }
        return adminStats;
    }
}
