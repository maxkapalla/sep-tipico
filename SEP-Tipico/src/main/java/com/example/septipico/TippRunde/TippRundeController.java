package com.example.septipico.TippRunde;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TippRundeController {

    @Autowired
    private TippRundeRepository tippRundeRepository;

    @PostMapping("/delete")
    public void deleteTippRunde(@RequestBody TippRunde TippRunde) {

        tippRundeRepository.deleteById(TippRunde.getId());
    }

    @PostMapping("/tippRunde/owner")
    public List<TippRunde> getByOwner(@RequestBody String ownerID){
        long userID = Integer.parseInt(ownerID);
        List<TippRunde> runden = new ArrayList<>();
        runden.addAll(tippRundeRepository.findAllByBesitzer(userID));

        int k = 0;
        for (TippRunde i : runden) {
            System.out.println(runden.get(k).getBesitzer());
        }

        return runden;
    }
}
