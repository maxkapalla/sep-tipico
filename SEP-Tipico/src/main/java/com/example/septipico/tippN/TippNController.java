package com.example.septipico.tippN;

import com.example.septipico.TippRunde.TippRunde;
import com.example.septipico.TippRunde.TippRundeRepository;
import com.example.septipico.TwoFa.TwoFaMail;
import com.example.septipico.liga.Team;
import com.example.septipico.liga.TeamRepository;
import com.example.septipico.liga.spiel.Spiel;
import com.example.septipico.liga.spiel.SpielRepository;
import com.example.septipico.tipp.TippContainer;
import com.example.septipico.tipper.Tipper;
import com.example.septipico.tipper.TipperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/save")
    public void saveTipp(@RequestBody TippN tipp) {

        System.out.println(" TippID " + tipp.getId() + " tippA: " + tipp.getTippA() + " Spiel: " + tipp.getSpiel() + " TippB: " + tipp.getTippB() + " TipprundenID: " + tipp.getTipprundenid() + " TipperID: " + tipp.getTipperID());

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
            tipps.addAll(tippNRepository.findAllByTipperID(t.getTipperid()));
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
                    if (tipp.getTippA().equals((long)match.getScoreTeamA()) && tipp.getTippB().equals((long)match.getScoreTeamB())) {
                        points += bewertungen[0];
                        System.out.println("erghit");
                    }

                    if (match.getScoreTeamA() > match.getScoreTeamB()) {
                        gewinner = match.getTeamA();
                        if (tipp.getTippA() > tipp.getTippB()) {
                            points += bewertungen[1];
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
                        System.out.println("diffhit");
                    }
                    break;
                }
            }
            if (points != 0) {
                System.out.println("TipperList size = " + tippers.size());
                for (Tipper tipper : tippers) {
                    System.out.println(tipp.getTipperID() + " == " + tipper.getTipperid());
                    if (tipp.getTipperID().equals(tipper.getTipperid())) {
                        System.out.println("Tipper:" + tipper.getNickname());
                        tipper.setPoints(points);
                        givePointsToTipper(tipper);
                    }
                }
                for (Team team : teams) {
                    if (gewinner == 0L) {
                        if (team.getTeamid().equals(bothTeams[0])) {
                            team.setPoints((int) points / 2);
                            givePointsToTeam(team);
                        } else if (team.getTeamid().equals(bothTeams[1])) {
                            team.setPoints((int) points / 2);
                            givePointsToTeam(team);
                        }

                    } else {
                        if (team.getTeamid().equals(gewinner)) {
                            System.out.println("Gewinner:" + team.getName());
                            team.setPoints((int) points);
                            System.out.println("Hier adde ich mein erstes Team");
                            System.out.println(team.getName() + " hat " + team.getPoints() + " Punkte");
                            givePointsToTeam(team);
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
                bewertungen[1] = Integer.parseInt(runde.getGewGewinner());
                bewertungen[2] = Integer.parseInt(runde.getGewDiff());
            }
        }
        return bewertungen;
    }

    private boolean checkDate(String date1, String[] date2){
        date1 = date1.substring(0,10);
        String[] splitstr1 = date1.split("-");
        if(Integer.parseInt(splitstr1[0]) <= Integer.parseInt(date2[2])){
                if(Integer.parseInt(splitstr1[1]) < Integer.parseInt(date2[1])){
                    return true;
                }else if(Integer.parseInt(splitstr1[1]) == Integer.parseInt(date2[1])){
                    if(Integer.parseInt(splitstr1[2]) <= Integer.parseInt(date2[0]))
                        return true;
                }

        }
        return false;
    }

    public void givePointsToTeam(Team team){
        for(Team teamdb: teamRepository.findAll()){
            if(teamdb.getTeamid().equals(team.getTeamid())){
                team.setPoints(team.getPoints()+teamdb.getPoints());
                teamRepository.delete(teamdb);
                System.out.println("deleted team: " + teamdb.getName());
                teamRepository.save(team);
                System.out.println("saved team: " + team.getName());

            }
        }
    }

    public void givePointsToTipper(Tipper tipper){
        for(Tipper tipperdb: tipperRepository.findAll()){
            if(tipper.getTipperid().equals(tipperdb.getTipperid())){
                tipper.setPoints(tipper.getPoints()+tipperdb.getPoints());
                tipperRepository.delete(tipperdb);
                System.out.println("deleted tipper: " + tipperdb.getNickname());
                tipperRepository.save(tipper);
                System.out.println("saved tipper: " + tipper.getNickname());
            }
        }
    }

    private void resetdb(){
        List<Team> teamsDB = teamRepository.findAll();
        System.out.println("Reset all");
        for(Team teamdelete: teamsDB){
            teamRepository.delete(teamdelete);
            teamdelete.setPoints(0);
            teamRepository.save(teamdelete);
        }
        List<Tipper> tippers = tipperRepository.findAll();
        for(Tipper tipperdelete: tippers){
            tipperRepository.delete(tipperdelete);
            tipperdelete.setPoints(0L);
            tipperRepository.save(tipperdelete);
        }
    }
}
