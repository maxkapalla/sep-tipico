package com.example.septipico.tipper;
import com.example.septipico.nutzer.Nutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TipperRepository extends JpaRepository<Tipper, Long> {
    Tipper findTipperByNutzeridAndTipprundenID(Long nutzerid, Long tipprundenID);

    List<Tipper> findAllByTipprundenID(Long tipprundenID);

    List<Tipper> findAllByNutzerid(Long nutzerid);
}
