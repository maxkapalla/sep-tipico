package com.example.septipico.tippN;


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

    @Column(name = "moneyTipp")
    private String moneyTipp;

    @Column(name ="quote")
    private Long quote;

    @Column(name="betGeld")
    private Long betGeld;

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

    public String getMoneyTipp() {
        return moneyTipp;
    }

    public void setMoneyTipp(String moneyTipp) {
        this.moneyTipp = moneyTipp;
    }

    public Long getQuote() {return quote;}

    public void setQuote(Long quote) {this.quote = quote; }

    public Long getBetGeld() {return betGeld ;}

    public void setBetGeld(Long betGeld) {this.betGeld = betGeld; }

    public Long getTipprundenid() {
        return tipprundenid;
    }

    public void setTipprundenid(Long tipprundenid) {
        this.tipprundenid = tipprundenid;
    }

}
