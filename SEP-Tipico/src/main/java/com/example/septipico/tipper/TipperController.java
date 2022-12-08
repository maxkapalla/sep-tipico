package com.example.septipico.tipper;

import com.example.septipico.TippRunde.TippRundeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tipper")
public class TipperController {

    @Autowired
    private TipperRepository tipperRepo;
    @Autowired
    private TippRundeRepository tippRundeRepo;

    @PostMapping("/save")
    public void saveTipper(@RequestBody Tipper tipper){
        System.out.println(tipper.getNutzerID() + " " + tipper.getTipprundenID());
        if(tipperRepo.findTipperByNutzerIDAndTipprundenID(tipper.getNutzerID(), tipper.getTipprundenID()) == null){
            tipperRepo.save(tipper);
        }
    }

    @GetMapping("/totalpoints/{nutzerid}/{ligaID}")
    public Long totalPoints(@PathVariable("nutzerid") Long nutzerID, @PathVariable("ligaID") Long ligaID){
       Long points = 0L;
       List<Tipper> tippers = tipperRepo.findAllByNutzerID(nutzerID);
       for(Tipper tipper: tippers){
           if(tippRundeRepo.findTippRundeById(tipper.getTipprundenID()).getLiga().equals(ligaID)){
               points += tipper.getPoints();
           }
       }
       return points;
    }
}
