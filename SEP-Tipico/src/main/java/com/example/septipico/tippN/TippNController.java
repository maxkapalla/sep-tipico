package com.example.septipico.tippN;

import com.example.septipico.TippRunde.TippRunde;
import com.example.septipico.TippRunde.TippRundeRepository;
import com.example.septipico.TwoFa.TwoFaMail;
import com.example.septipico.liga.Team;
import com.example.septipico.liga.TeamRepository;
import com.example.septipico.liga.spiel.Spiel;
import com.example.septipico.liga.spiel.SpielRepository;
import com.example.septipico.nutzer.Nutzer;
import com.example.septipico.tipp.TippContainer;
import com.example.septipico.tipper.Tipper;
import com.example.septipico.tipper.TipperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.septipico.nutzer.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tippn")
public class TippNController {

    @Autowired
    private TippNRepository tippNRepository;

    @Autowired
    private TipperRepository tipperRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private SpielRepository spielRepository;

    @Autowired
    private TippRundeRepository rundeRepository;

    @Autowired
    private NutzerRepository nutzerRepository;

    @PostMapping("/save")
    public void saveTipp(@RequestBody TippN tipp) {

        System.out.println(" TippID " + tipp.getId() + " tippA: " + tipp.getTippA() + " Spiel: " + tipp.getSpiel() +
                " TippB: " + tipp.getTippB() + " TipprundenID: " + tipp.getTipprundenid() + " TipperID: " + tipp.getTipperID()+
                " SiegHeim/Unent/SiegAuswärts?: " + tipp.getMoneyTipp() + " Quote: " + tipp.getQuote()+ " Geldeinsatz: " + tipp.getBetGeld());

        tippNRepository.save(tipp);
    }

    @PostMapping("/all")
    public List<TippN> getAll() {
        return tippNRepository.findAll();
    }

    @GetMapping("/all")
    public List<TippN> getAllTipps(){
        return tippNRepository.findAll();
    }

    @PostMapping("/owner")
    public List<TippContainer> getByOwner(@RequestBody String ownerID) {
        long userID = Integer.parseInt(ownerID);

        List<Tipper> tippers = tipperRepository.findAllByNutzerid(userID);
        List<TippN> tipps = new ArrayList<>();
        List<TippContainer> tippContainers = new ArrayList<>();

        for (Tipper t : tippers) {
            tipps.addAll(tippNRepository.findAllByTipperID(t.getId()));
        }

        for (TippN tipp : tipps) {
            TippContainer cont = new TippContainer();
            Long spielID = tipp.getSpiel();
            Spiel spiel = spielRepository.getReferenceById(spielID);

            //cont.setSpiel(spiel);
            cont.setTipp(tipp);
            cont.setTipp1(tipp.getTippA() + "");
            cont.setTipp2(tipp.getTippB() + "");

            cont.setTeam1(teamRepository.getReferenceById(spiel.getTeamA()).getName());
            cont.setTeam2(teamRepository.getReferenceById(spiel.getTeamB()).getName());

            tippContainers.add(cont);
        }

        return tippContainers;
    }


    @PostMapping("/mail")
    public TippMail sendTipp(@RequestBody TippMail tippMail) {
        TwoFaMail tippSender = new TwoFaMail();

        String sender = tippMail.senderName;
        String mail = tippMail.userMail;
        TippN tipp = tippMail.tipp;

        String team1 = tippMail.getTeam1Name();
        String team2 = tippMail.getTeam2Name();

        try {
            tippSender.sendMail(mail,
                    sender + " Tippt beim Spiel " + team1 + " | " + tipp.getTippA() + ":" + tipp.getTippB() + " | " + team2
                    , "Tipp von " + sender);
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        }

        return tippMail;
    }

    @GetMapping("/givePoints/{date}")
    public boolean givePoints(@PathVariable("date") String[] date){
        System.out.println(date);
        List<TippN> tipps = tippNRepository.findAll();
        List<Tipper> tippers = tipperRepository.findAll();
        List<Spiel> spiele = spielRepository.findAll();
        List<Team> teams = teamRepository.findAll();

        long points;

        resetdb();
        for(TippN tipp: tipps) {
            long gewinner = 0L;
            long[] bothTeams = new long[2];
            points = 0;
            System.out.println("begin");
            for (Spiel match : spiele) {
                if (tipp.getSpiel().equals(match.getId()) && this.checkDate(match.getDate().toString(), date)) {
                    int[] bewertungen = this.getBewertungen(tipp);
                    System.out.println(bewertungen[0]+" "+bewertungen[1]+" " +bewertungen[2]);
                    if (tipp.getTippA().equals((long)match.getScoreTeamA()) && tipp.getTippB().equals((long)match.getScoreTeamB())) {
                        points += bewertungen[0];
                        System.out.println(bewertungen[0]);
                        System.out.println("erghit");
                    }

                    if (match.getScoreTeamA() > match.getScoreTeamB()) {
                        gewinner = match.getTeamA();
                        if (tipp.getTippA() > tipp.getTippB()) {
                            points += bewertungen[1];
                            System.out.println(bewertungen[1]);
                            System.out.println("gewA");
                        }
                    } else if (match.getScoreTeamA() < match.getScoreTeamB()) {
                        gewinner = match.getTeamB();
                        if (tipp.getTippA() < tipp.getTippB()) {
                            points += bewertungen[1];
                            System.out.println("gewB");
                        }
                    } else {
                        System.out.println("Es gibt Gleichstand!");
                        bothTeams[0] = match.getTeamA();
                        bothTeams[1] = match.getTeamB();
                        if(tipp.getTippA().equals(tipp.getTippB())){
                            points += bewertungen[1];
                        }
                    }

                    if ((tipp.getTippA() - tipp.getTippB()) == (match.getScoreTeamA() - match.getScoreTeamB())) {
                        points += bewertungen[2];
                        System.out.println(bewertungen[2]);
                        System.out.println("diffhit");
                    }
                    break;
                }
            }
            System.out.println("Punkte: "+ points);
            if (points != 0) {
                System.out.println("TipperList size = " + tippers.size());
                for (Tipper tipper : tippers) {
                    System.out.println(tipp.getTipperID() + " == " + tipper.getId());
                    if (tipp.getTipperID().equals(tipper.getId())) {
                        System.out.println("Tipper:" + tipper.getNickname());
                        tipper.setPoints(tipper.getPoints() + points);
//                        givePointsToTipper(tipper);
                        tipperRepository.save(tipper);
                    }
                }
                for (Team team : teams) {
                    if (gewinner == 0L) {
                        if (team.getId().equals(bothTeams[0])) {
                            team.setPoints(team.getPoints() +((int) points / 2));
//                            givePointsToTeam(team);
                            teamRepository.save(team);
                        } else if (team.getId().equals(bothTeams[1])) {
                            team.setPoints(team.getPoints() + ((int) points / 2));
//                            givePointsToTeam(team);
                            teamRepository.save(team);
                        }

                    } else {
                        if (team.getId().equals(gewinner)) {
                            System.out.println("Gewinner:" + team.getName());
                            team.setPoints(team.getPoints() + (int) points);
                            System.out.println(team.getName() + " hat " + team.getPoints() + " Punkte");
//                            givePointsToTeam(team);
                            teamRepository.save(team);

                            break;
                        }
                    }
                }
            }
        }
        return true;
    }

    public int[] getBewertungen(TippN tipp){
        List<TippRunde> tippRunden = rundeRepository.findAll();
        int[] bewertungen = new int[3];
        for(TippRunde runde:  tippRunden){
            if(tipp.getTipprundenid().equals(runde.getId())){
                bewertungen[0] = Integer.parseInt(runde.getGewTore());
                System.out.println(Integer.parseInt(runde.getGewTore()));

                bewertungen[1] = Integer.parseInt(runde.getGewGewinner());
                System.out.println(Integer.parseInt(runde.getGewGewinner()));

                bewertungen[2] = Integer.parseInt(runde.getGewDiff());
                System.out.println(Integer.parseInt(runde.getGewDiff()));

            }
        }
        return bewertungen;
    }

    private boolean checkDate(String date1, String[] date2){
        date1 = date1.substring(0,10);
        String[] splitstr1 = date1.split("-");
        if(Integer.parseInt(splitstr1[0]) == Integer.parseInt(date2[2])){
                if(Integer.parseInt(splitstr1[1]) < Integer.parseInt(date2[1])){
                    return true;
                }else if(Integer.parseInt(splitstr1[1]) == Integer.parseInt(date2[1])){
                    if(Integer.parseInt(splitstr1[2]) <= Integer.parseInt(date2[0]))
                        return true;
                }

        }
        return false;
    }

//    public void givePointsToTeam(Team team){
//        for(Team teamdb: teamRepository.findAll()){
//            if(teamdb.getId().equals(team.getId())){
//                team.setPoints(team.getPoints()+teamdb.getPoints());
//                teamRepository.delete(teamdb);
//                System.out.println("deleted team: " + teamdb.getName());
//                teamRepository.save(team);
//                System.out.println("saved team: " + team.getName());
//
//            }
//        }
//    }
//
//    public void givePointsToTipper(Tipper tipper){
//        for(Tipper tipperdb: tipperRepository.findAll()){
//            if(tipper.getId().equals(tipperdb.getId())){
//                tipper.setPoints(tipper.getPoints()+tipperdb.getPoints());
//                tipperRepository.delete(tipperdb);
//                System.out.println("deleted tipper: " + tipperdb.getNickname());
//                tipperRepository.save(tipper);
//                System.out.println("saved tipper: " + tipper.getNickname());
//            }
//        }
//    }

    private void resetdb(){
        List<Team> teamsDB = teamRepository.findAll();
        System.out.println("Reset all");
        for(Team teamdelete: teamsDB){
            teamdelete.setPoints(0);
            teamRepository.save(teamdelete);
        }
        List<Tipper> tippers = tipperRepository.findAll();
        for(Tipper tipperdelete: tippers){
            tipperdelete.setPoints(0L);
            tipperRepository.save(tipperdelete);
        }
    }

    @GetMapping("/giveMoney/{date}")
    public boolean giveMoney(@PathVariable("date") String[] date){
        System.out.println(date);
        List<TippN> tipps = tippNRepository.findAll();
        List<Tipper> tippers = tipperRepository.findAll();
        List<Spiel> spiele = spielRepository.findAll();
        List<Nutzer> nutzers = nutzerRepository.findAll();

        int gewinn;

        resetdb();
        for(TippN tipp: tipps) {
     //       long gewinner = 0L;
     //       long[] bothTeams = new long[2];
            gewinn = 0;
            System.out.println("begin");
            for (Spiel match : spiele) {
                if (tipp.getSpiel().equals(match.getId()) && this.checkDate(match.getDate().toString(), date)) {

                    if (match.getScoreTeamA() > match.getScoreTeamB()) {
                 //       gewinner = match.getTeamA();
                        if (tipp.getMoneyTipp().equals("SiegerA")) {
                            gewinn= (int) (tipp.getBetGeld()*tipp.getQuote());
                            System.out.println("SiegerA");
                        }
                    } else if (match.getScoreTeamA() < match.getScoreTeamB()) {
                //        gewinner = match.getTeamB();
                        if (tipp.getMoneyTipp().equals("SiegerB")) {
                            gewinn= (int) (tipp.getBetGeld()*tipp.getQuote());
                            System.out.println("SiegerB");
                        }
                    } else {
                        System.out.println("Unentschieden!");
               //         bothTeams[0] = match.getTeamA();
               //         bothTeams[1] = match.getTeamB();
                        if(tipp.getMoneyTipp().equals("Draw")){
                            gewinn= (int) (tipp.getBetGeld()*tipp.getQuote());
                        }
                    }
                    break;
                }
            }
            if (gewinn != 0) {
                System.out.println("TipperList size = " + tippers.size());
                for (Tipper tipper : tippers) {
                    System.out.println(tipp.getTipperID() + " == " + tipper.getId());
                    if (tipp.getTipperID().equals(tipper.getId())) {
                        System.out.println("Tipper gefunden: " + tipper.getId());
                        for(Nutzer nutzer : nutzers) {
                            if(tipper.getNutzerid().equals(nutzer.getId())) {
                                System.out.println("Nutzer gefunden: " + nutzer.getId());
                                System.out.println("Nutzer gefunden: " + nutzer.getId());
                                nutzer.setKontostand(nutzer.getKontostand()+gewinn);
                                nutzerRepository.save(nutzer);
                            }
                        }
   //                     System.out.println("Tipper:" + tipper.getNickname());
   //                     tipper.setPoints(tipper.getPoints() + points);
//                        givePointsToTipper(tipper);
 //                       tipperRepository.save(tipper);
                    }
                }
            }
        }
        return true;
    }
}
