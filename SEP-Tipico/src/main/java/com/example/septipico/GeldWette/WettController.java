package com.example.septipico.GeldWette;

import com.example.septipico.TwoFa.TwoFaMail;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/GeldWette")
public class WettController {

    @PostMapping("/mail")
    public WettBeantragen sendTipp(@RequestBody WettBeantragen WettBeantragen) {
        TwoFaMail tippSender = new TwoFaMail();

        String sender = WettBeantragen.senderName;
        String mail = WettBeantragen.userMail;

        try {
            tippSender.sendMail(mail,
                    sender + " beantragt Wetten mit Geld spielen zu dürfen "
                    , "Tippspiel-Wette Antrag von " + sender);
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        }

        return WettBeantragen;
    }
}
