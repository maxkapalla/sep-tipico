package com.example.septipico.GeldWette;

import com.example.septipico.TwoFa.TwoFaMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.septipico.nutzer.*;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/GeldWette")
public class WettController {
    @Autowired
    private NutzerRepository nutzerrepo;
    @PostMapping("/mail")
    public WettBeantragen sendTipp(@RequestBody WettBeantragen WettBeantragen) {

        TwoFaMail tippSender = new TwoFaMail();

        String sender = WettBeantragen.senderName;
        String mail = WettBeantragen.userMail;

        try {
            for(Nutzer x: nutzerrepo.findAll()) {
                if(x.getRole().equals("admin")) {
                    mail=x.getEmail();
                    tippSender.sendMail(mail,
                            sender + " beantragt Wetten mit Geld spielen zu dürfen "
                            , "Tippspiel-Wette Antrag von " + sender);
                    System.out.println("mail versendet an " + mail);
                }
            }
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        }

        return WettBeantragen;
    }
}
