package com.example.septipico.liga;

public class AdminStats {

    String ligaName;

    long ligaID;

    long userCount;

    long tippRundenCount;

    public String getLigaName() {
        return ligaName;
    }

    public void setLigaName(String ligaName) {
        this.ligaName = ligaName;
    }

    public long getLigaID() {
        return ligaID;
    }

    public void setLigaID(long ligaID) {
        this.ligaID = ligaID;
    }

    public long getUserCount() {
        return userCount;
    }

    public void setUserCount(long userCount) {
        this.userCount = userCount;
    }

    public long getTippRundenCount() {
        return tippRundenCount;
    }

    public void setTippRundenCount(long tippRundenCount) {
        this.tippRundenCount = tippRundenCount;
    }
}
