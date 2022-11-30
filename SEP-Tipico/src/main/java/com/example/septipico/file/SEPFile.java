package com.example.septipico.file;

import javax.persistence.*;
import java.io.File;
import java.io.Serializable;

@Entity
@Table(name = "sepfile")
public class SEPFile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "file")
    private File file;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
