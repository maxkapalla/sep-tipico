package com.example.septipico.tippN;

import com.example.septipico.liga.spiel.Spiel;
import com.example.septipico.nutzer.Nutzer;

import javax.persistence.*;

@Entity
public class TippN {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "tipperID")
    private Long tipperID;
    @Column(name = "spielID")
    private Long spiel;

    @Column(name = "tipprundenid")
    private Long tipprundenid;
    @Column(name = "tippA")
    private Long tippA;
    @Column(name = "tippB")
    private Long tippB;
    @Column(name = "dfff")
    private boolean diff;
    @Column(name = "gewinner")
    private boolean gewinner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTipperID() {
        return tipperID;
    }

    public void setTipperID(Long tipperID) {
        this.tipperID = tipperID;
    }

    public Long getSpiel() {
        return spiel;
    }

    public void setSpiel(Long spiel) {
        this.spiel = spiel;
    }

    public Long getTippA() {
        return tippA;
    }

    public void setTippA(Long tippA) {
        this.tippA = tippA;
    }

    public Long getTippB() {
        return tippB;
    }

    public void setTippB(Long tippB) {
        this.tippB = tippB;
    }

    public boolean getLiga() {
        return diff;
    }

    public void setLiga(boolean diff) {
        this.diff = diff;
    }

    public void setGewinner(boolean gewinner) {
        this.gewinner = gewinner;
    }

    public Long getTipprundenid() {
        return tipprundenid;
    }

    public void setTipprundenid(Long tipprundenid) {
        this.tipprundenid = tipprundenid;
    }

    public boolean isDiff() {
        return diff;
    }

    public void setDiff(boolean diff) {
        this.diff = diff;
    }

    public boolean isGewinner() {
        return gewinner;
    }
}
