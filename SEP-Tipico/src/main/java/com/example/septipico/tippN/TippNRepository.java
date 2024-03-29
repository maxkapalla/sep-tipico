package com.example.septipico.tippN;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TippNRepository extends JpaRepository<TippN, Long> {

    List<TippN> findAll();

    List<TippN> findAllByTipperID(Long tipperID);

    void deleteAllByTipprundenid(Long tipprundenid);
}
