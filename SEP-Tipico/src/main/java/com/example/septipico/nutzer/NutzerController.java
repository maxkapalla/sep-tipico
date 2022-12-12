package com.example.septipico.nutzer;


import org.springframework.beans.factory.annotation.Autowired;
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
        nutzer.setFirstName(nutzer.getFirstName().substring(0,1).toUpperCase()+ nutzer.getFirstName().substring(1));
        nutzer.setLastName(nutzer.getLastName().substring(0,1).toUpperCase()+ nutzer.getLastName().substring(1));
        nutzerrepo.save(nutzer);
    }

    @PostMapping("/user/signup")
    public void addUser(@RequestBody Nutzer nutzer) {
        nutzer.setRole("user");
        nutzer.setFirstName(nutzer.getFirstName().substring(0,1).toUpperCase()+ nutzer.getFirstName().substring(1));
        nutzer.setLastName(nutzer.getLastName().substring(0,1).toUpperCase()+ nutzer.getLastName().substring(1));
        nutzerrepo.save(nutzer);
    }

    @GetMapping ("/nutzer/signin/{email}/{password}")
    public Nutzer loginNutzer(@PathVariable("email") String email, @PathVariable("password") String password){
       //System.out.println(email);
       return nutzerrepo.findNutzerByEmailAndPassword(email, password);
    }

    @GetMapping("/nutzer/search/{fn}/{ln}")
    public List<Nutzer> searchNutzer(@PathVariable("fn") String firstName, @PathVariable("ln") String lastName){
        firstName = firstName.substring(0,1).toUpperCase() + firstName.substring(1);
        lastName = lastName.substring(0,1).toUpperCase() + lastName.substring(1);
        return nutzerrepo.findAllByFirstNameOrLastNameContaining(firstName,lastName);
    }

    @GetMapping("/nutzer/search/{n}")
    public List<Nutzer> searchNutzer(@PathVariable("n") String name){
        name = name.substring(0,1).toUpperCase() + name.substring(1);
        List<Nutzer> all = nutzerrepo.findAllByFirstNameContaining(name);
        List<Nutzer> lastnames = nutzerrepo.findAllByLastNameContaining(name);
        if(all.size()== 0) return lastnames;
        for(Nutzer nutzer : all)
            for(Nutzer temp: lastnames)
                if(temp.getId() != nutzer.getId())
                    all.add(temp);
        return all;
    }
    @GetMapping("/nutzer/{id1}/{id2}/{id3}")
    public List<Nutzer> getNutzerById(@PathVariable("id1") Long id1, @PathVariable("id2") Long id2, @PathVariable("id3") Long id3){
        List<Nutzer> nutzer = new ArrayList<>(3);
        nutzer.add(0,nutzerrepo.findNutzerById(id1));
        nutzer.add(1,nutzerrepo.findNutzerById(id2));
        nutzer.add(2,nutzerrepo.findNutzerById(id3));
        return nutzer;
    }
}
