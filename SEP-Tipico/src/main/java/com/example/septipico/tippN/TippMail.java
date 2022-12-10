package com.example.septipico.tippN;

import com.example.septipico.TippRunde.TippRunde;


public class TippMail {

    TippN tipp;
    String userMail;
    String senderName;

    String team1Name;

    String team2Name;

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

    public String getTeam1Name() {
        return team1Name;
    }

    public void setTeam1Name(String team1Name) {
        this.team1Name = team1Name;
    }

    public String getTeam2Name() {
        return team2Name;
    }

    public void setTeam2Name(String team2Name) {
        this.team2Name = team2Name;
    }
}
