package com.example.septipico.liga;

import javax.persistence.*;

@Entity
@Table(name = "Liga")
public class Liga {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "url")
    private String url;

    public Liga() {

    }

    public Liga(String name) {
        this.name = name;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUtl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return this.url;
    }
}
