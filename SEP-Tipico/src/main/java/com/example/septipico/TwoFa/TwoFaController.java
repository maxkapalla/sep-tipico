package com.example.septipico.TwoFa;


import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TwoFaController {

    @RequestMapping("/twofa/auth")
    public TwoFaCode sendMail(@RequestBody TwoFaCode twoFa){
        String email = twoFa.mail;
        TwoFaMail mailSender = new TwoFaMail();

        String code = twoFa.twofa;

        //System.out.println("mail adress: " + email + " " + code);

        try {
            mailSender.sendMail(email, "Dein 2FA Code: " + code);
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        }
        return twoFa;
    }
}
