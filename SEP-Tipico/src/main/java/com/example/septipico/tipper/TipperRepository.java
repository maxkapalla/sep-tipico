package com.example.septipico.tipper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TipperRepository extends JpaRepository<Tipper, Long> {
    Tipper findTipperByNutzerIDAndTipprundenID(Long nutzerID, Long tipprundenID);

    List<Tipper> findAllByNutzerID(Long nutzerID);
}
