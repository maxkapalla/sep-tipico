package com.example.septipico;

import com.example.septipico.TippRunde.TippRundeRepository;
import com.example.septipico.chat.ChatRepository;
import com.example.septipico.liga.LigaRepository;
import com.example.septipico.liga.TeamRepository;
import com.example.septipico.nutzer.FriendsRepository;
import com.example.septipico.nutzer.NutzerRepository;
import com.example.septipico.tippN.TippNRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;



@SpringBootApplication
public class SepTipicoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SepTipicoApplication.class, args);

 /*
        TwoFaMail mail = new TwoFaMail();
        try {
            mail.sendMail("yannicklange00@gmail.com");
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        } */
    }


    @Bean
    CommandLineRunner init(ChatRepository chatRepo, LigaRepository ligaRepository, TeamRepository teamRepository, NutzerRepository nutzerrepo, FriendsRepository friendrepo, TippRundeRepository tippRundeRepo, TippNRepository tippNRepository) {
        return args -> {

//            chatRepo.save(new Chats(1L, Arrays.asList(4689L,4692L),true));
//            friendrepo.save(new Friends(21L, 4408L, true));
//            friendrepo.save(new Friends(22L, 4408L,true));
/*            int max = 1000;, Ti
            int min = 0;

            List<Liga> ligaList = new ArrayList<Liga>();

            for (int i = 0; i < 10; i++) {
                Liga l = new Liga("Testliga" + ((Math.random() * (max - min)) + min));
                ligaList.add(l);

            }

            ligaRepository.saveAll(ligaList);

            ligaList = ligaRepository.findAll();


            int ligaSize = ligaList.size();

            List<Team> teamList = new ArrayList<Team>();

            for (int i = 0; i < 10; i++) {
                Team t = new Team();
                t.setName("Team" + (int) ((Math.random() * (max - min)) + min));
                t.setPoints((int) ((Math.random() * (max - min)) + min));
                t.setGoals((int) ((Math.random() * (max - min)) + min));
                int ligaIndex = (int) ((Math.random() * (ligaSize - 0)) + 0);
                t.setLiga(ligaList.get((int) ligaIndex).getId());
                teamList.add(t);
            }
            teamRepository.saveAll(teamList);


            for (Team te : teamRepository.findAll()) {
                System.out.println(te.getName() + " Points: " + te.getPoints() + " Goals: " + te.getGoals() + " Liga: " + te.getLiga());
            }
*/

//            nutzerrepo.save(new Nutzer("jan", "müller", "2000-09-07", "jan.mueller@uni.de", "abc", "https://cdn-icons-png.flaticon.com/512/149/149071.png","user"));
//            nutzerrepo.save(new Nutzer("yannick", "lange", null, "yannick.lange@uni.de", "def", null, "admin"));
//            nutzerrepo.save(new Nutzer("lukas", "lucky", "1998-01-01", "lukas.lucky@uni.de", "ghi","https://cdn-icons-png.flaticon.com/512/149/149071.png", "user"));
//            nutzerrepo.save(new Nutzer("jan", "müller", "2000-09-07", "jan.mueller@uni.de", "abc", "https://cdn-icons-png.flaticon.com/512/149/149071.png", false));
            //          nutzerrepo.save(new Nutzer("yannick", "lange", null, "yannick.lange@uni.de", "def", null, true));
            //        nutzerrepo.save(new Nutzer("lukas", "lucky", "1998-01-01", "lukas.lucky@uni.de", "ghi", "https://cdn-icons-png.flaticon.com/512/149/149071.png", false));
        };
    }


}
