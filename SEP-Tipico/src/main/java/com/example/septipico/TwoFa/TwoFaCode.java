package com.example.septipico.TwoFa;

public class TwoFaCode {
    String twofa;
    String mail;

    public TwoFaCode(String code, String mail) {
        this.twofa = code;
        this.mail = mail;
    }

    public String getTwofa() {
        return twofa;
    }

    public void setTwofa(String twofa) {
        this.twofa = twofa;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
