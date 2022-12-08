package com.example.septipico.nutzer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {
    List<Friends> findAllByAccepted(boolean accepted);
    List<Friends> findAllByReceiverAndSender(Long receiver, Long sender);
}
