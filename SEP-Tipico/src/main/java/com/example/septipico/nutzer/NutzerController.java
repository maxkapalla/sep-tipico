package com.example.septipico.nutzer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NutzerController {

    @Autowired
    private NutzerRepository nutzerrepo;

    @PostMapping("/admin/signup")
    public void addAdmin(@RequestBody Nutzer nutzer) {
        nutzer.setRole("admin");
        nutzer.setGeldWette("ja");
        nutzer.setFirstName(nutzer.getFirstName().substring(0, 1).toUpperCase() + nutzer.getFirstName().substring(1));
        nutzer.setLastName(nutzer.getLastName().substring(0, 1).toUpperCase() + nutzer.getLastName().substring(1));
        nutzerrepo.save(nutzer);
    }

    @PostMapping("/user/signup")
    public void addUser(@RequestBody Nutzer nutzer) {
        nutzer.setRole("user");
        nutzer.setGeldWette("Nicht angefragt");
        nutzer.setFirstName(nutzer.getFirstName().substring(0, 1).toUpperCase() + nutzer.getFirstName().substring(1));
        nutzer.setLastName(nutzer.getLastName().substring(0, 1).toUpperCase() + nutzer.getLastName().substring(1));
        nutzerrepo.save(nutzer);
    }

    @GetMapping("/nutzer/signin/{email}/{password}")
    public Nutzer loginNutzer(@PathVariable("email") String email, @PathVariable("password") String password) {
        //System.out.println(email);
        return nutzerrepo.findNutzerByEmailAndPassword(email, password);
    }

    @GetMapping("/nutzer/search/{fn}/{ln}")
    public List<Nutzer> searchNutzer(@PathVariable("fn") String firstName, @PathVariable("ln") String lastName) {
        firstName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
        lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1);
        return nutzerrepo.findAllByFirstNameOrLastNameContaining(firstName, lastName);
    }

    @GetMapping("/nutzer/search/{n}")
    public List<Nutzer> searchNutzer(@PathVariable("n") String name) {
        name = name.substring(0, 1).toUpperCase() + name.substring(1);
        List<Nutzer> all = nutzerrepo.findAllByFirstNameContaining(name);
        List<Nutzer> lastnames = nutzerrepo.findAllByLastNameContaining(name);
        if (all.size() == 0) return lastnames;
        for (Nutzer nutzer : all)
            for (Nutzer temp : lastnames)
                if (temp.getId() != nutzer.getId())
                    all.add(temp);
        return all;
    }

    @GetMapping("/nutzer/{id1}/{id2}/{id3}")
    public List<Nutzer> getNutzerById(@PathVariable("id1") Long id1, @PathVariable("id2") Long id2, @PathVariable("id3") Long id3) {
        List<Nutzer> nutzer = new ArrayList<>(3);
        nutzer.add(0, nutzerrepo.findNutzerById(id1));
        nutzer.add(1, nutzerrepo.findNutzerById(id2));
        nutzer.add(2, nutzerrepo.findNutzerById(id3));
        return nutzer;
    }

    @GetMapping("/nutzer/alle")
    public List<Nutzer> getAllNutzer() {
        return nutzerrepo.findAll();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @RequestMapping(path = "/nutzer/kontostand",
            method = RequestMethod.GET)
    public ResponseEntity<?> getKontostand(@RequestParam(name = "id") String id) {
        Integer kontostand;
        try {
            kontostand = nutzerrepo.findNutzerById(Long.parseLong(id)).getKontostand();
        } catch (Exception e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(kontostand, HttpStatus.OK);
    }


    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @RequestMapping(path = "/nutzer/kontostand",
            method = RequestMethod.POST)
    public ResponseEntity<?> setKontostand(@RequestParam(name = "id") String id, @RequestBody String kontostand) {
        System.out.println(id + " " + kontostand);
        try {
            nutzerrepo.updateKontostandById(Long.parseLong(id), Integer.parseInt(kontostand));
        } catch (Exception e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/nutzer/{id}")
    public Nutzer getNutzerByID(@PathVariable("id") Long id) {
        Nutzer x = nutzerrepo.findNutzerById(id);
        return x;
    }
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @RequestMapping(path = "/nutzer/geldStatus",
            method = RequestMethod.POST)
    public ResponseEntity<?> setGeldStatus(@RequestParam(name = "id") String id, @RequestBody String geldWette) {
        System.out.println(id + " " + geldWette);
        try {
            nutzerrepo.updateGeldStatusById(Long.parseLong(id), geldWette);
        } catch (Exception e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PostMapping("/nutzer/Wettstatus")
    public List<Nutzer> getNutzerByWettstatus(@RequestBody String status) {
        List<Nutzer> x= new ArrayList<Nutzer>();
        x.addAll(nutzerrepo.findAllByGeldWette(status));
        return x;
    }
}
