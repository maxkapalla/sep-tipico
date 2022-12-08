package com.example.septipico.TwoFa;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

public class TwoFaMail {

    public void sendMail(String mailAdress, String message, String betreff) throws MessagingException {
        Properties properties = new Properties();

        properties.put("mail.stmp.user" , "septipico@hotmail.com");


        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.password", "SEP2022tipico");
        properties.put("mail.smtp.socketFactory.port", "587");
        properties.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");


        properties.put("mail.smtp.host", "smtp.office365.com");

        SmtpAuthenticator authenticator = new SmtpAuthenticator();
        Message mail = new MimeMessage(Session
                .getInstance(properties, authenticator));


        mail.setFrom(new InternetAddress("septipico@hotmail.com"));
        mail.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mailAdress));
        mail.setSubject(betreff);

        MimeBodyPart body = new MimeBodyPart();
        body.setContent(message, "text/html; charset=utf-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(body);

        mail.setContent(multipart);

        Transport.send(mail);

    }
}
