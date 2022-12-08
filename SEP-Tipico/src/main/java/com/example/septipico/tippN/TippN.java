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

    @OneToOne
    @JoinColumn(name = "nutzer_id")
    private Nutzer nutzer;

    @JoinColumn(name = "spiel_id")
    @OneToOne
    private Spiel spiel;
    @Column(name = "tippA")
    private Long tippA;
    @Column(name = "tippB")
    private Long tippB;
    @Column(name = "Liga")
    private Long liga;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Nutzer getNutzer() {
        return nutzer;
    }

    public void setNutzer(Nutzer nutzer) {
        this.nutzer = nutzer;
    }

    public Spiel getSpiel() {
        return spiel;
    }

    public void setSpiel(Spiel spiel) {
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

    public Long getLiga() {
        return liga;
    }

    public void setLiga(Long liga) {
        this.liga = liga;
    }
}
