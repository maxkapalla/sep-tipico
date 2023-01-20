package com.example.septipico.GeldWette;

import com.example.septipico.tippN.TippN;

public class WettBeantragen {
    String userMail;
    String senderName;

    public WettBeantragen(String userMail, String senderName) {
        this.userMail = userMail;
        this.senderName = senderName;
    }
    public WettBeantragen() {
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

}
