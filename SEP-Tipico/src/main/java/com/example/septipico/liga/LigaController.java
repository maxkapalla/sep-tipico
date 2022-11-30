package com.example.septipico.liga;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/liga")
public class LigaController {

    @Autowired
    private LigaRepository ligaRepository;


    @PostMapping("/delete")
    public void deleteLiga(@RequestBody Liga liga) {

        ligaRepository.deleteById(liga.getId());
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


}
