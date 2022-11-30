package com.example.septipico.nutzer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NutzerController {

    @Autowired
    private NutzerRepository nutzerrepo;

    @PostMapping("/admin/signup")
    public void addAdmin(@RequestBody Nutzer nutzer) {
        nutzer.setRole("admin");
        nutzerrepo.save(nutzer);
    }

    @PostMapping("/user/signup")
    public void addUser(@RequestBody Nutzer nutzer) {
        nutzer.setRole("user");
        nutzerrepo.save(nutzer);
    }

    @GetMapping ("/nutzer/signin/{email}/{password}")
    public Nutzer loginNutzer(@PathVariable("email") String email, @PathVariable("password") String password){
       //System.out.println(email);
       return nutzerrepo.findNutzerByEmailAndPassword(email, password);
    }
}
