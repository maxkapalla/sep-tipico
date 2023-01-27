package com.example.septipico.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chats, Long> {

    Chats findChatsById(Long id);

    List<Chats> findChatsByRequestedIsFalse();
}
