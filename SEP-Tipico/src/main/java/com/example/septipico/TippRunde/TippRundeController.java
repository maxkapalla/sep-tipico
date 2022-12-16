package com.example.septipico.TippRunde;

import com.example.septipico.TwoFa.TwoFaMail;
import com.example.septipico.liga.Liga;
import com.example.septipico.nutzer.Nutzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TippRundeController {

    @Autowired
    private TippRundeRepository tippRundeRepository;

    @PostMapping("/tippRunde/delete")
    public void deleteTippRunde(@RequestBody TippRunde TippRunde) {

        tippRundeRepository.deleteById(TippRunde.getId());
    }

    @PostMapping("/tippRunde/save")
    public void saveTippRunde(@RequestBody TippRunde tippRunde) {
        tippRundeRepository.save(tippRunde);
    }
    @PostMapping("/tippRunde/save/new")
    public void newTippRunde(@RequestBody String tippRunde, String zugang, long besitzer,
                             Long liga, String gewTore, String gewDiff, String gewGewinner) {

        TippRunde t = new TippRunde();
        t.setId(null);
        t.setTipprundeName(tippRunde);
        t.setZugang(zugang);
        t.setBesitzer(besitzer);
        t.setLiga(liga);
        t.setGewTore(gewTore);
        t.setGewDiff(gewDiff);
        t.setGewGewinner(gewGewinner);
        tippRundeRepository.save(t);
        System.out.println(t);

    }

    @PostMapping("/tippRunde/name")
    public List<TippRunde> getTippRunde(@RequestBody String name) {
        List<TippRunde> t = new ArrayList<TippRunde>();
        t.add(tippRundeRepository.findTippRundeByTipprundeName(name));
        return t;
    }
    @PostMapping("/tippRunde/liga")
    public List<TippRunde> getTippRundeByLiga(@RequestBody Long ligaid) {
        List<TippRunde> t = new ArrayList<TippRunde>();
        t.addAll(tippRundeRepository.findTippRundeByLiga(ligaid));
        return t;
    }
    @PostMapping("/tippRunde/id")
    public TippRunde getTippRundeByID(@RequestBody String id) {
        long searchID = Integer.parseInt(id);
        TippRunde t = tippRundeRepository.findTippRundeById(searchID);
        return t;
    }


    @GetMapping("/tippRunde/all")
    public List<TippRunde> getTippRunden() {
        return tippRundeRepository.findAll();
    }


    @PostMapping("/tippRunde/owner")
    public List<TippRunde> getByOwner(@RequestBody String ownerID){
        long userID = Integer.parseInt(ownerID);
        List<TippRunde> runden = new ArrayList<>();
        runden.addAll(tippRundeRepository.findAllByBesitzer(userID));

        return runden;
    }

    @PostMapping("/tippRunde/mail")
    public TippRundeMail sendTippRunde(@RequestBody TippRundeMail tippRundeMail) {
        TwoFaMail rundeSender = new TwoFaMail();

        String sender = tippRundeMail.senderName;
        String mail = tippRundeMail.userMail;
        TippRunde runde = tippRundeMail.tippRunde;
        long rundeID = runde.getId();
        String rundePw = runde.getPassword();
        String rundeName = runde.getTipprundeName();

        String link = "<a href="+"http://localhost:4200/tipprunde-drinne/" + rundeID + "/" + rundePw + ">";

        try {
            rundeSender.sendMail(mail, sender +
                    " Hat dich zur Tipprunde " + rundeName +" eingeladen." + "<html>" + "<br/>" + "</html>" +
                    "Clicke auf diesen Link um die Tipprunde anzusehen: " +
                    "<html>"+ link + rundeName + "</a></html>"
                    , "Tipprunden Einladung von " + sender);
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        }

        return tippRundeMail;
    }
}
