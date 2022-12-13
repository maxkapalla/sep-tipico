package com.example.septipico.tipper;

import com.example.septipico.TippRunde.TippRunde;
import com.example.septipico.TippRunde.TippRundeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tipper")
public class TipperController {

    @Autowired
    private TipperRepository tipperRepo;
    @Autowired
    private TippRundeRepository tippRundeRepo;


    @PostMapping("/all")
    public List<Tipper> getAll() {
        return tipperRepo.findAll();
    }

    @PostMapping("/all/tipprunden")
    public List<Tipper> getAllByRunde(@RequestBody Long TipprundenID ) {
        List<Tipper> tipper= new ArrayList<>();
        tipper.addAll(tipperRepo.findAllByTipprundenID(TipprundenID));
        return tipper;
    }

    @PostMapping("/save")
    public void saveTipper(@RequestBody Tipper tipper) {
        System.out.println(tipper.getNutzerid() + " " + tipper.getTipprundenID());
        if (tipperRepo.findTipperByNutzeridAndTipprundenID(tipper.getNutzerid(), tipper.getTipprundenID()) == null) {
            tipperRepo.save(tipper);
        }
    }

    @GetMapping("/topthree/{ligaID}")
    public List<Tipper> topthree(@PathVariable("ligaID") Long ligaID) {
        List<TippRunde> tippRunden = tippRundeRepo.findTippRundeByLiga(ligaID);
        List<Tipper> tipper = new ArrayList<>();
        for (TippRunde tippRunde : tippRunden) {
            List<Tipper> tprs = tipperRepo.findAllByTipprundenID(tippRunde.getId());
            for (Tipper tpr : tprs) {
                int i = 0;
                for (Tipper t : tipper) {
                    if (tpr.getNutzerid().equals(t.getNutzerid())) {
                        t.setPoints(tpr.getPoints() + t.getPoints());
                        i++;
                    }
                }
                if (i == 0) tipper.add(tpr);
            }
        }
        List<Tipper> topThree = new ArrayList<>(3);
        for (int i = 0; i < tipper.size(); i++)
            System.out.println(tipper.get(i).getNutzerid() + " " + tipper.get(i).getPoints());
        for (Tipper t : tipper) {
            try {
                if (topThree.size() == 0) {
                    topThree.add(t);
                } else if (t.getPoints() >= topThree.get(0).getPoints()) {
                    topThree.add(0, t);
                } else if (t.getPoints() >= topThree.get(1).getPoints()) {
                    topThree.add(1, t);
                } else if (t.getPoints() >= topThree.get(2).getPoints()) {
                    topThree.add(2, t);
                }
            } catch (Exception e) {
                topThree.add(2, t);
            }
            if (topThree.size() > 3) topThree.remove(3);

        }
        for (int i = 0; i < topThree.size(); i++)
            System.out.println(topThree.get(i).getPoints());
        return topThree;
    }


}
