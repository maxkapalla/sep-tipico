package com.example.septipico.tippN;

import com.example.septipico.TwoFa.TwoFaMail;
import com.example.septipico.liga.TeamRepository;
import com.example.septipico.liga.spiel.Spiel;
import com.example.septipico.liga.spiel.SpielRepository;
import com.example.septipico.tipp.TippContainer;
import com.example.septipico.tipper.Tipper;
import com.example.septipico.tipper.TipperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tippn")
public class TippNController {

    @Autowired
    private TippNRepository tippNRepository;

    @Autowired
    private TipperRepository tipperRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private SpielRepository spielRepository;

    @PostMapping("/save")
    public void saveTipp(@RequestBody TippN tipp) {

        System.out.println(" TippID " + tipp.getId() + " tippA: " + tipp.getTippA() + " Spiel: " + tipp.getSpiel() + " TippB: " + tipp.getTippB() + " TipprundenID: " + tipp.getTipprundenid() + " TipperID: " + tipp.getTipperID());

        tippNRepository.save(tipp);
    }

    @PostMapping("/owner")
    public List<TippContainer> getByOwner(@RequestBody String ownerID) {
        long userID = Integer.parseInt(ownerID);

        List<Tipper> tippers = tipperRepository.findAllByNutzerid(userID);

        List<TippN> tipps = new ArrayList<>();

        List<TippContainer> tippContainers = new ArrayList<>();

        for (Tipper t : tippers) {
            tipps.addAll(tippNRepository.findAllByTipperID(t.getId()));
        }

        for (TippN tipp : tipps) {
            TippContainer cont = new TippContainer();
            Long spielID = tipp.getSpiel();
            Spiel spiel = spielRepository.getReferenceById(spielID);

            //cont.setSpiel(spiel);
            cont.setTipp(tipp);
            cont.setTipp1(tipp.getTippA() + "");
            cont.setTipp2(tipp.getTippB() + "");

            cont.setTeam1(teamRepository.getReferenceById(spiel.getTeamA()).getName());
            cont.setTeam2(teamRepository.getReferenceById(spiel.getTeamB()).getName());

            tippContainers.add(cont);
        }

        return tippContainers;
    }


    @PostMapping("/mail")
    public TippMail sendTipp(@RequestBody TippMail tippMail) {
        TwoFaMail tippSender = new TwoFaMail();

        String sender = tippMail.senderName;
        String mail = tippMail.userMail;
        TippN tipp = tippMail.tipp;

        String team1 = tippMail.getTeam1Name();
        String team2 = tippMail.getTeam2Name();

        try {
            tippSender.sendMail(mail,
                    sender + " Tippt beim Spiel " + team1 + " | " + tipp.getTippA() + ":" + tipp.getTippB() + " | " + team2
                    , "Tipp von " + sender);
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        }

        return tippMail;
    }

}
