package com.example.septipico.TippRunde;

import javax.persistence.*;

@Entity
public class TippRunde {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name= "tipprundename")
    private String tipprundeName;

    @Column(name= "password")
    private String password;

    @Column(name= "Zugang")
    private String zugang;

    @Column(name= "Besitzer")
    private Long besitzer;

    @Column(name= "Liga")
    private Long liga;

    @Column(name= "GewTore")
    private String gewTore;

    @Column(name= "GewDiff")
    private String gewDiff;

    @Column(name= "GewGewinner")
    private String gewGewinner;

    public TippRunde() {

    }
    public TippRunde(String tipprundeName, String password, String zugang, Long besitzer,
                     Long liga, String gewTore, String gewDiff, String gewGewinner) {
        this.tipprundeName= tipprundeName;
        this.password= password;
        this.zugang= zugang;
        this.besitzer= besitzer;
        this.liga= liga;
        this.gewTore= gewTore;
        this.gewDiff= gewDiff;
        this.gewGewinner= gewGewinner;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id=id;
    }
    public String getTipprundeName() {
        return tipprundeName;
    }
    public void setTipprundeName(String tipprundeName) {
        this.tipprundeName= tipprundeName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password= password;
    }
    public String getZugang() {
        return zugang;
    }
    public void setZugang(String zugang) {
        this.zugang= zugang;
    }
    public Long getBesitzer() {
        return besitzer;
    }
    public void setBesitzer(Long besitzer) {
        this.besitzer= besitzer;
    }
    public Long getLiga() {
        return liga;
    }
    public void setLiga(Long liga) {
        this.liga= liga;
    }

    public String getGewTore(String gewTore) {
        return gewTore;
    }
    public void setGewTore(String gewTore) {
        this.gewTore=gewTore;
    }
    public String getGewDiff(String gewDiff) {
        return gewDiff;
    }
    public void setGewDiff(String gewDiff) {
        this.gewDiff=gewDiff;
    }
    public String getGewGewinner(String gewGewinner) {
        return gewTore;
    }
    public void setGewGewinner(String gewGewinner) {
        this.gewGewinner=gewGewinner;
    }
}
