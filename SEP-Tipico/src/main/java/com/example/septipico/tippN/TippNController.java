package com.example.septipico.tippN;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tippn")
public class TippNController {

    @Autowired
    private TippNRepository tippNRepository;

    @PostMapping
    public void saveTipp(@RequestBody TippN tipp) {
        tippNRepository.save(tipp);
    }


}
