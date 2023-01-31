package com.example.septipico.TippRunde;

import com.example.septipico.TwoFa.TwoFaMail;
import com.example.septipico.liga.Team;
import com.example.septipico.liga.TeamRepository;
import com.example.septipico.liga.spiel.Spiel;
import com.example.septipico.liga.spiel.SpielRepository;
import com.example.septipico.tippN.TippN;
import com.example.septipico.tippN.TippNRepository;
import com.example.septipico.tipper.Tipper;
import com.example.septipico.tipper.TipperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TippRundeController {

    @Autowired
    private TippRundeRepository tippRundeRepository;

    @Autowired
    private TipperRepository tipperRepository;

    @Autowired
    private TippNRepository tippNRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private SpielRepository spielRepository;

    @PostMapping("/tippRunde/delete")
    public void deleteTippRunde(@RequestBody TippRunde TippRunde) {

        tippRundeRepository.deleteById(TippRunde.getId());
    }

    @PostMapping("/tippRunde/save")
    public void saveTippRunde(@RequestBody TippRunde tippRunde) {
        tippRundeRepository.save(tippRunde);
    }
    @PostMapping("/tippRunde/save/new")
    public void newTippRunde(@RequestBody String tippRunde, String zugang, long besitzer,
                             Long liga, String gewTore, String gewDiff, String gewGewinner) {

        TippRunde t = new TippRunde();
        t.setId(null);
        t.setTipprundeName(tippRunde);
        t.setZugang(zugang);
        t.setBesitzer(besitzer);
        t.setLiga(liga);
        t.setGewTore(gewTore);
        t.setGewDiff(gewDiff);
        t.setGewGewinner(gewGewinner);
        tippRundeRepository.save(t);
        System.out.println(t);

    }

    @PostMapping("/tippRunde/name")
    public List<TippRunde> getTippRunde(@RequestBody String name) {
        List<TippRunde> t = new ArrayList<TippRunde>();
        t.add(tippRundeRepository.findTippRundeByTipprundeName(name));
        return t;
    }
    @PostMapping("/tippRunde/liga")
    public List<TippRunde> getTippRundeByLiga(@RequestBody Long ligaid) {
        List<TippRunde> t = new ArrayList<TippRunde>();
        t.addAll(tippRundeRepository.findTippRundeByLiga(ligaid));
        return t;
    }
    @PostMapping("/tippRunde/id")
    public TippRunde getTippRundeByID(@RequestBody String id) {
        long searchID = Integer.parseInt(id);
        TippRunde t = tippRundeRepository.findTippRundeById(searchID);
        return t;
    }


    @GetMapping("/tippRunde/all")
    public List<TippRunde> getTippRunden() {
        return tippRundeRepository.findAll();
    }


    @PostMapping("/tippRunde/owner")
    public List<TippRunde> getByOwner(@RequestBody String ownerID){
        long userID = Integer.parseInt(ownerID);
        List<TippRunde> runden = new ArrayList<>();
        runden.addAll(tippRundeRepository.findAllByBesitzer(userID));

        return runden;
    }

    @PostMapping("/tippRunde/member")
    public List<TippRunde> getByMember(@RequestBody String memberID){
        long userID = Integer.parseInt(memberID);

        List<Tipper> tippers = new ArrayList<>();
        tippers.addAll(tipperRepository.findAllByNutzerid(userID));
        System.out.println(tippers.size());

        List<TippRunde> runden = new ArrayList<>();

        for (int i = 0; i < tippers.size(); i++) {
            runden.add(tippRundeRepository.findTippRundeById(tippers.get(i).getTipprundenID()));
        }
        System.out.println(runden.size());

        return runden;
    }

    @PostMapping("/tippRunde/mail")
    public TippRundeMail sendTippRunde(@RequestBody TippRundeMail tippRundeMail) {
        TwoFaMail rundeSender = new TwoFaMail();

        String sender = tippRundeMail.senderName;
        String mail = tippRundeMail.userMail;
        TippRunde runde = tippRundeMail.tippRunde;
        long rundeID = runde.getId();
        String rundePw = runde.getPassword();
        String rundeName = runde.getTipprundeName();

        String link = "<a href="+"http://localhost:4200/tipprunde-drinne/" + rundeID + "/" + rundePw + ">";

        try {
            rundeSender.sendMail(mail, sender +
                    " Hat dich zur Tipprunde " + rundeName +" eingeladen." + "<html>" + "<br/>" + "</html>" +
                    "Clicke auf diesen Link um die Tipprunde anzusehen: " +
                    "<html>"+ link + rundeName + "</a></html>"
                    , "Tipprunden Einladung von " + sender);
        } catch (javax.mail.MessagingException e) {
            System.out.println("mail versenden fehlgeschlagen");
        }

        return tippRundeMail;
    }

    @PostMapping("/tippRunde/ergebnisstats")
    public List<ErgebnisStats> getEergebnisStats(@RequestBody String userIDandTipprundeID) {
        List<ErgebnisStats> ergebnisStatsList = new ArrayList<>();

        String[] split = userIDandTipprundeID.split("-");
        long userID = Integer.parseInt(split[0]);
        long tipprundeID = Integer.parseInt(split[1]);

        Tipper tipper = tipperRepository.findTipperByNutzeridAndTipprundenID(userID, tipprundeID);

        List<TippN> tippList = tippNRepository.findAllByTipperID(tipper.getId());

        for(TippN tipp: tippList) {
            String tippString = tipp.getTippA() + ":" + tipp.getTippB();
            boolean found = false;
            for(ErgebnisStats ergebnis: ergebnisStatsList) {
                if (ergebnis.getErgebnis().equals(tippString)) {
                    ergebnis.setCount(ergebnis.getCount() + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                ErgebnisStats ergebnis = new ErgebnisStats();
                ergebnis.setErgebnis(tippString);
                ergebnis.setCount(1);

                ergebnisStatsList.add(ergebnis);
            }
        }
        return ergebnisStatsList;
    }

    @PostMapping("/tippRunde/userstats")
    public List<UserStats> getUserStats(@RequestBody String userIDandTipprundeID) {
        System.out.println("userstats gestartet");
        List<UserStats> userStatsList = new ArrayList<>();

        String[] split = userIDandTipprundeID.split("-");
        long userID = Integer.parseInt(split[0]);
        long tipprundeID = Integer.parseInt(split[1]);
        String date = split[2];

        System.out.println(userID + "tipprundeid: " + tipprundeID);

        TippRunde tippRunde = tippRundeRepository.findTippRundeById(tipprundeID);
        Tipper tipper = tipperRepository.findTipperByNutzeridAndTipprundenID(userID, tipprundeID);

        List<TippN> tippList = tippNRepository.findAllByTipperID(tipper.getId());

        List<Team> teamList = teamRepository.findByLiga(tippRunde.getLiga());

        List<Spiel> spielList = spielRepository.findByLiga(tippRunde.getLiga());

        System.out.println("teamlistlänge: " + teamList.size() + " tipplistlänge: " + tippList.size());

        userStatsList = fillUserTable(userStatsList, teamList, tippList, tippRunde);
        userStatsList = fillPieChartStats(userStatsList, teamList, tippList, spielList, date, tippRunde);

        return userStatsList;
    }

    private List<UserStats> fillPieChartStats(List<UserStats> userStatsList, List<Team> teamList, List<TippN> tippList, List<Spiel> spielList, String date, TippRunde tippRunde) {

        int erg = Integer.parseInt(tippRunde.getGewTore());
        int dif = Integer.parseInt(tippRunde.getGewDiff());
        int gew = Integer.parseInt(tippRunde.getGewGewinner());

        System.out.println("spiellist länge: " +spielList.size());

        List<Spiel> helpList = new ArrayList<>();
        for(Spiel spiel: spielList) {
            if(checkDate(spiel.getDate().toString(), date)) {
                helpList.add(spiel);
            }
        }
        spielList = helpList;
        System.out.println("spiellist länge: " +spielList.size());

        for(Spiel spiel: spielList) {
            for (TippN tipp : tippList) {

                if ((long)tipp.getSpiel() == spiel.getId()) {

                    System.out.println("in der inneren for schleife");
                    if (tipp.getTippA().intValue() == spiel.getScoreTeamA() && tipp.getTippB().intValue() == spiel.getScoreTeamB()) {
                        giveToRightTeam(userStatsList, spiel, erg);
                    } else if (tipp.getTippA().intValue() - spiel.getScoreTeamA() == tipp.getTippB().intValue() - spiel.getScoreTeamB()) {
                        giveToRightTeam(userStatsList, spiel, dif);
                    } else if (tipp.getTippA() > tipp.getTippB() && spiel.getScoreTeamA() > spiel.getScoreTeamB()) {
                        giveToRightTeam(userStatsList, spiel, gew);
                    } else if (tipp.getTippA() < tipp.getTippB() && spiel.getScoreTeamA() < spiel.getScoreTeamB()) {
                        giveToRightTeam(userStatsList, spiel, gew);
                    } else if (tipp.getTippA() == tipp.getTippB() && spiel.getScoreTeamA() == spiel.getScoreTeamB()) {
                        giveToRightTeam(userStatsList, spiel, gew);
                    }
                }
            }
        }
        return userStatsList;
    }

    private List<UserStats> giveToRightTeam(List<UserStats> userStatsList, Spiel spiel, int points) {
        if (spiel.getScoreTeamA() > spiel.getScoreTeamB()) {
            userStatsList = insertTeamPoints(userStatsList, spiel.getTeamA(), points);
            System.out.println("punkte verteilt " + points);
        } else if(spiel.getScoreTeamB() > spiel.getScoreTeamA()) {
            userStatsList = insertTeamPoints(userStatsList, spiel.getTeamB(), points);
            System.out.println("punkte verteilt " + points);
        } else if(spiel.getScoreTeamA() == spiel.getScoreTeamB()) {
            userStatsList = insertTeamPoints(userStatsList, spiel.getTeamA(), points);
            userStatsList = insertTeamPoints(userStatsList, spiel.getTeamB(), points);
            System.out.println("punkte verteilt " + points);
        }
        return userStatsList;
    }

    private List<UserStats> insertTeamPoints(List<UserStats> userStatsList, Long teamID, int points) {
        UserStats userStat = getStatByTeamID(userStatsList, teamID);
        userStatsList.remove(userStat);
        System.out.println("Team: " + userStat.getTeamName() + " + " + points + " Punkte");
        userStat.setPointsForUser(userStat.getPointsForUser() + points);
        userStatsList.add(userStat);
        return userStatsList;
    }

    private UserStats getStatByTeamID(List<UserStats> userStatsList, long teamID) {
        UserStats userStat = null;
        for (UserStats stat : userStatsList) {
            if (stat.getTeamID() == teamID) {
                userStat = stat;
                break;
            }
        }
        return userStat;
    }

    private boolean checkDate(String date1, String date2){
        String[] date3 = date2.split("\\.");
        date1 = date1.substring(0,10);
        String[] splitstr1 = date1.split("-");
        if(Integer.parseInt(splitstr1[0]) <= Integer.parseInt(date3[2])){
            if(Integer.parseInt(splitstr1[1]) < Integer.parseInt(date3[1])){
                return true;
            }else if(Integer.parseInt(splitstr1[1]) == Integer.parseInt(date3[1])){
                if(Integer.parseInt(splitstr1[2]) <= Integer.parseInt(date3[0]))
                    return true;
            }

        }
        return false;
    }

    private List<UserStats> fillUserTable(List<UserStats> userStatsList, List<Team> teamList, List<TippN> tippList, TippRunde tippRunde) {

        int erg = Integer.parseInt(tippRunde.getGewTore());
        int dif = Integer.parseInt(tippRunde.getGewDiff());
        int gew = Integer.parseInt(tippRunde.getGewGewinner());

        for(Team team: teamList) {
            UserStats stat = new UserStats();
            stat.setTeamName(team.getName());
            stat.setTeamID(team.getId());
            userStatsList.add(stat);
            stat.setPointsForUser(0);
        }

        for(TippN tipp: tippList) {
            for(UserStats stat: userStatsList) {
                Spiel spiel = spielRepository.findByid(tipp.getSpiel());
                long teamAid = spiel.getTeamA();
                long teamBid = spiel.getTeamB();

                if(stat.getTeamID() == teamAid) {
                    if(spiel.getScoreTeamA() > spiel.getScoreTeamB()) {
                        stat.setWins(stat.getWins() + 1);
                        stat.setPointsForTable(stat.getPointsForTable() + 3);

                        int diff = spiel.getScoreTeamA() - spiel.getScoreTeamB();
                        stat.setTordif(stat.getTordif() + diff);
                    } else
                        if(spiel.getScoreTeamA() == spiel.getScoreTeamB()) {
                        stat.setDraws(stat.getDraws() + 1);
                        stat.setPointsForTable(stat.getPointsForTable() + 1);
                    } else
                        if(spiel.getScoreTeamA() < spiel.getScoreTeamB()) {
                            stat.setLoses(stat.getLoses() + 1);

                            int diff = spiel.getScoreTeamA() - spiel.getScoreTeamB();
                            stat.setTordif(stat.getTordif() + diff);
                        }
                } else
                    if(stat.getTeamID() == teamBid) {
                        if(spiel.getScoreTeamB() > spiel.getScoreTeamA()) {
                            stat.setWins(stat.getWins() + 1);
                            stat.setPointsForTable(stat.getPointsForTable() + 3);

                            int diff = spiel.getScoreTeamB() - spiel.getScoreTeamA();
                            stat.setTordif(stat.getTordif() + diff);
                        } else
                        if(spiel.getScoreTeamB() == spiel.getScoreTeamA()) {
                            stat.setDraws(stat.getDraws() + 1);
                            stat.setPointsForTable(stat.getPointsForTable() + 1);
                        } else
                        if(spiel.getScoreTeamB() < spiel.getScoreTeamA()) {
                            stat.setLoses(stat.getLoses() + 1);

                            int diff = spiel.getScoreTeamB() - spiel.getScoreTeamA();
                            stat.setTordif(stat.getTordif() + diff);
                        }
                }
            }
        }

        return userStatsList;
    }
}
