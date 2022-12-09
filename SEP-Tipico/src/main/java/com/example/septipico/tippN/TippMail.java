package com.example.septipico.tippN;

import com.example.septipico.TippRunde.TippRunde;


public class TippMail {

    TippN tipp;
    String userMail;
    String senderName;

    public TippMail(TippN tipp, String userMail, String senderName) {
        this.tipp = tipp;
        this.userMail = userMail;
        this.senderName = senderName;
    }
    public TippMail() {
    }

    public TippN getTipp() {
        return tipp;
    }

    public void setTipp(TippN tipp) {
        this.tipp = tipp;
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
