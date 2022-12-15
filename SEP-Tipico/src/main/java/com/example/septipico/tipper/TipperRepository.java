package com.example.septipico.tipper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TipperRepository extends JpaRepository<Tipper, Long> {
    Tipper findTipperByNutzeridAndTipprundenID(Long nutzerid, Long tipprundenID);

   void deleteById(Long id);

    List<Tipper> findAllByTipprundenID(Long tipprundenID);

    List<Tipper> findAllByNutzerid(Long nutzerid);

    Tipper findTipperByTipperid(Long tipperid);
}
