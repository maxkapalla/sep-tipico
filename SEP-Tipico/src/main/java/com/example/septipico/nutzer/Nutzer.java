package com.example.septipico.nutzer;

import javax.persistence.*;

@Entity
public class Nutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "dateOfBirth")
    private String dateOfBirth;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "imageURL")
    private String imageURL;
    @Column(name = "Role")
    private String role;
    @Column(name = "kontostand", columnDefinition = "integer default 0")
    private Integer kontostand;

    @Column(name = "GeldWette")
    private String geldWette;

    public Nutzer() {
    }

    public Nutzer(String firstName, String lastName, String dateOfBirth, String email, String password, String imageURL, String role, String geldWette) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.imageURL = imageURL;
        this.role = role;
        this.geldWette = geldWette;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Integer getKontostand() {
        return kontostand;
    }

    public void setKontostand(Integer kontostand) {
        this.kontostand = kontostand;
    }

    public String getGeldWette() {
        return geldWette;
    }

    public void setGeldWette(String geldWette) {
        this.geldWette = geldWette;
    }
}
