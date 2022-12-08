package com.example.septipico.tippN;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tippn")
public class TippNController {

    @Autowired
    private TippNRepository tippNRepository;

    @PostMapping("/save")
    public void saveTipp(@RequestBody TippN tipp) {

        System.out.println(tipp.getId() + "  " + tipp.getTippA() + " ");

        tippNRepository.save(tipp);
    }


}
