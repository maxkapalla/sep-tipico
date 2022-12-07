package com.example.septipico.nutzer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
        nutzer.setLastName(nutzer.getFirstName().substring(0,1).toUpperCase()+ nutzer.getFirstName().substring(1));
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
        all.addAll(nutzerrepo.findAllByLastNameContaining(name));
        return all;
    }
}
