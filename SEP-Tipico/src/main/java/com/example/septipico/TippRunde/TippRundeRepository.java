package com.example.septipico.TippRunde;

import com.example.septipico.liga.Liga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TippRundeRepository extends JpaRepository<TippRunde, Long> {

    TippRunde findTippRundeByTipprundeName(String name);
    List<TippRunde> findAll();
}
