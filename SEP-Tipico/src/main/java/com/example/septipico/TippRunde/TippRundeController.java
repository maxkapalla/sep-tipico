package com.example.septipico.TippRunde;

import com.example.septipico.TwoFa.TwoFaMail;
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

        String link = "<a href="+"http://localhost:4200/tippRunde/RundenID/" + rundeID + "/" + rundePw + ">";

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
