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

    public TippRunde() {
    }

    public TippRunde(String tipprundeName, String password, String zugang, Long besitzer, Long liga) {
        this.tipprundeName= tipprundeName;
        this.password= password;
        this.zugang= zugang;
        this.besitzer= besitzer;
        this.liga= liga;
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
}
