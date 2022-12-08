package com.example.septipico.TippRunde;

public class TippRundeMail {

    TippRunde tippRunde;
    String userMail;
    String senderName;

    public TippRundeMail(TippRunde tippRunde, String userMail, String senderName) {
        this.tippRunde = tippRunde;
        this.userMail = userMail;
        this.senderName = senderName;
    }
    public TippRundeMail() {
    }

    public TippRunde getTippRunde() {
        return tippRunde;
    }

    public void setTippRunde(TippRunde tippRunde) {
        this.tippRunde = tippRunde;
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
