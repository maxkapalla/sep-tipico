import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Match} from "../Models/Match";
import {MatchService} from "../services/match.service";
import {TippService} from "../services/tipp.service";
import {TippRundeService} from "../services/tipp-runde.service";
import {Tipp} from "../Models/TippN";
import {TippRunde} from "../Models/TippRunde";
import {Tipper} from "../Models/Tipper";
import {NutzerService} from "../services/nutzer.service";
import {MatSnackBar} from "@angular/material/snack-bar";

require('../patch.js')


@Component({
  selector: 'app-geld-wette-abgeben',
  templateUrl: './geld-wette-abgeben.component.html',
  styleUrls: ['./geld-wette-abgeben.component.scss']
})
export class GeldWetteAbgebenComponent implements OnInit {

  ligen: Liga[];
  matches: Match[];
  vergangeneMatches: Match[];

  tipprunden: TippRunde[];
  matchesMap: Map<bigint, Match>;
  match: Match;
  alleMatches:Match[];
  ligaNamen: Map<bigint, String>;
  ligaid: bigint;
  liga: Liga;

  tipp: Tipp;

  matchid: bigint;

  //tipprunde: TippRunde;
  tipprundenid: bigint;
  loadtable: boolean;

  previousTipps: Tipp[];
  userid: string;

  alltipper: Tipper[];
  usertips: Tipp[];
  usertiptable: boolean;

  kontostand: bigint;

  copyid: bigint;
  tipprundenraw: TippRunde[];


  teamA:bigint|undefined
  teamB:bigint|undefined
  a:bigint|undefined
  SpieleTeamA=0;
  insgesamtSiege=0;
  heimQuote:number;
  drawQuote:number;
  AuswQuote:number;
  quote:number;

  constructor(private router: Router,
              private LigaService: LigaService, private TeamService: TeamService,
              private MatchService: MatchService, private TippService: TippService,
              private TippRundeService: TippRundeService,
              private nutzerService: NutzerService, private snackBar: MatSnackBar) {
    this.ligen = [];
    this.matches = [];
    this.tipprunden = [];
    this.tipprundenraw = [];
    this.ligaNamen = new Map<bigint, String>;
    this.ligaid = BigInt("0")
    this.liga = new Liga();
    this.match = new Match();
    this.vergangeneMatches= [];
    this.alleMatches=[];
    this.tipp = new Tipp();
    this.matchid = BigInt("0");
    this.matchesMap = new Map<bigint, Match>;
    // this.tipprunde = new TippRunde();
    this.tipprundenid = BigInt("0");
    this.loadtable = false;
    this.previousTipps = [];
    this.userid = "0";
    this.alltipper = [];
    this.usertips = [];
    this.usertiptable = false;
    this.copyid = BigInt("0");

    this.kontostand= BigInt(sessionStorage.getItem("kontostand") + "");
    this.teamA=BigInt(0);
    this.teamB=BigInt(0);
    this.a=BigInt(0);

    this.quote=0;
    this.heimQuote=0;
    this.drawQuote=0;
    this.AuswQuote=0;

  }


  ngOnInit(): void {
    if (sessionStorage.getItem("id") != null) {
      // @ts-ignore
      this.userid = sessionStorage.getItem("id");
    }

    this.MatchService.getAll().subscribe((data: any) => this.matches = data)
    this.LigaService.getAll().subscribe((data: any) => {
      this.ligen = data;
      this.compileLigen()
    })


    this.TippRundeService.getAll().subscribe((data: any) => {
      this.tipprundenraw = data;

      this.TippService.getAllTipper().subscribe((data: any) => {
        this.alltipper = data;

        console.log(this.tipprundenraw)
        console.log(this.alltipper)

        let tippRundenIds: bigint[] = [];

        for (let ti of this.alltipper) {
          if (ti.nutzerid == BigInt((sessionStorage.getItem("id") + ""))) {
            if (ti.tipprundenID != null) {
              tippRundenIds.push(ti.tipprundenID);
            }
          }

        }


        for (let runde of this.tipprundenraw) {
          for (let id of tippRundenIds) {
            if (runde.id == id) {
              this.tipprunden.push(runde);
            }

          }
        }

      })

    })


    /* this.TippRundeService.getTippRundeByUserID(sessionStorage.getItem("id") + "").subscribe((data: any) => {
       this.tipprunden = data;
     })*/


    this.TippService.getAllTips().subscribe((data: any) => {
      this.previousTipps = data;

    })


  }

  onLoadTipprunde() {


    for (let t of this.tipprunden) {
      if (this.tipprundenid == t.id && t.liga != null) {
        this.ligaid = BigInt(t.liga);
        this.tipp.tipprundenid = this.tipprundenid;
        this.usertiptable = true;
        this.getTipsToCopy();

      }
    }
    this.onShowMatchesInLiga();

  }

  compileLigen() {
    for (let liga of this.ligen) {
      if (liga.id != null && liga.name != null) {
        this.ligaNamen.set(liga.id, liga.name);

      }
    }
  }

  onCopy() {
    let tempt = this.tipprundenid;
    for (let t of this.usertips) {
      if (t.id == this.copyid) {

        this.tipp = t;
        this.tipp.id = undefined;
        this.tipp.tipprundenid = tempt;

      }
    }

  }


  onShowMatchesInLiga(): void {
    this.matches = [];

    if (this.ligaid == BigInt("0")) {
      this.MatchService.getAll().subscribe((data: Match[]) => {
        for (let match of data) {
          if (!this.MatchService.isGameDayPassed(match.date)) {
            this.matches.push(match);
          }
        }

      });
    } else if (this.ligaid != null) {
      for (let ligat of this.ligen) {
        if (ligat.id != null && ligat.name != null) {
          if (this.ligaid == ligat.id) {
            this.liga = ligat;
          }

        }
      }
      this.MatchService.getByLiga(this.liga).subscribe((data: any) => {
        this.alleMatches = data;})

      this.MatchService.getByLiga(this.liga).subscribe((data: any) => {
        this.vergangeneMatches = [];

        for (let match of data) {
          if (this.MatchService.isGameDayPassed(match.date)) {
            this.vergangeneMatches.push(match);
          }
        }
      });

      this.MatchService.getByLiga(this.liga).subscribe((data: any) => {
        this.matches = [];

        for (let match of data) {
          if (!this.MatchService.isGameDayPassed(match.date)) {
            console.log(match);
            this.matches.push(match);
          }
        }
      });

    }
    this.loadtable = true;

  }

  getTipsToCopy() {
    this.usertips = [];
    let alltips: Tipp[];

    let tipperids: bigint[] = [];

    for (let ti of this.alltipper) {
      if (ti.id != null && BigInt(ti.nutzerid) == BigInt(this.userid)) {
        tipperids.push(BigInt(ti.id));
      }

    }

    this.TippService.getAllTips().subscribe((data: any) => {
      alltips = data;

      let matchLigaMap: Map<bigint, bigint>;
      matchLigaMap = new Map<bigint, bigint>();
      for (let m of this.matches) {
        if (m.liga != null && m.id != null) {
          matchLigaMap.set(m.id, m.liga);
        }

      }


      for (let a of alltips) {

        if (a.tipprundenid != null && a.tipperID != null && a.spiel != null) {

          for (let id of tipperids) {
            if (a.tipperID == id) {
              if (matchLigaMap.get(a.spiel) == this.ligaid) {


                this.usertips.push(a);


              }


            }
          }


        }

      }


    })


  }

  winnerQuote(id:bigint|undefined) {



    console.log(this.alleMatches.length+" Wieviele Spiele gibt es? ")

    for(let m=0;m<this.alleMatches.length;m++) {
     // console.log(this.alleMatches[m].spieltag)
      if(id == this.alleMatches[m].id) {
        this.a=this.alleMatches[m].id;
        this.teamA=this.alleMatches[m].teamA;
        this.teamB=this.alleMatches[m].teamB;
        console.log("Match gefunden!")
      }
      else {
      }
    }
    console.log("Team A: "+this.teamA+ ", Team B: "+this.teamB);
    console.log("spielid: "+ this.tipp.id+ "== " +this.a);

    //Zeile 228-236 verlegt wegen LigaID suche
    console.log(this.vergangeneMatches.length+" Wieviele gespielten Spiele gibt es? ")

    this.SpieleTeamA=0;
    let SpieleTeamB=0;
    let insgesamtSpiele=SpieleTeamB+this.SpieleTeamA;

    let SiegeA=0; //für Heimquote
    let LosesB=0;

    let SiegeB=0; //Auswärtsquote
    let LosesA=0;

    let DrawA=0;  //Unentschiedenquote
    let DrawB=0;

    this.insgesamtSiege=0;

    for(let g of this.vergangeneMatches) {

      if(g.teamA==this.teamA) {
        if(this.SpieleTeamA>=5) {

        }
        else {
          this.SpieleTeamA += 1;
          if(g.scoreTeamA>g.scoreTeamB) {
            SiegeA += 1;
          }
          else if(g.scoreTeamA==g.scoreTeamB) {
            DrawA += 1;
          }
          else {
            LosesA += 1;
          }

        }
      }
      else if(g.teamB==this.teamA) {
        if(this.SpieleTeamA>=5) {

        }
        else {
          this.SpieleTeamA += 1;
          if(g.scoreTeamA<g.scoreTeamB) {
            SiegeA += 1;
          }
          else if(g.scoreTeamA==g.scoreTeamB) {
            DrawA += 1;
          }
          else {
            LosesA += 1;
          }
        }
      }
      if(g.teamA==this.teamB) {
        if(SpieleTeamB>=5) {

        }
        else {
          SpieleTeamB += 1;
          if(g.scoreTeamA<g.scoreTeamB) {
            LosesB += 1;
          }
          else if(g.scoreTeamA==g.scoreTeamB) {
            DrawB +=1;
          }
          else {
            SiegeB +=1;
          }
        }
      }
      else if(g.teamB==this.teamB) {
        if(SpieleTeamB>=5) {

        }
        else {
          SpieleTeamB += 1;
          if(g.scoreTeamA>g.scoreTeamB) {
            LosesB += 1;
          }
          else if(g.scoreTeamA==g.scoreTeamB) {
            DrawB += 1;
          }
          else {
            SiegeB;
          }
        }
      }
    }

    insgesamtSpiele=SpieleTeamB+this.SpieleTeamA;
    if(SiegeA+LosesB==0) { //infinity bug fix
      this.heimQuote=insgesamtSpiele/1;
    }
    else {
      this.heimQuote=insgesamtSpiele/(SiegeA+LosesB);
    }
    if(DrawB+DrawA==0) {
      this.drawQuote=insgesamtSpiele/1;
    }
    else {
      this.drawQuote=insgesamtSpiele/(DrawA+DrawB);
    }
    if(SiegeB+LosesA==0) {
      this.AuswQuote=insgesamtSpiele/1;
    }
    else {
      this.AuswQuote=insgesamtSpiele/(SiegeB+LosesA);
    }

    console.log("Spiele A: "+this.SpieleTeamA+", Spiele B: "+SpieleTeamB)
    console.log("Siege A: "+SiegeA+ ", Loses B: "+LosesB);
    console.log("Draw A: "+DrawA+ ", Draw B: "+ DrawB);
    console.log("Siege B: "+SiegeB+ ", Loses A: "+LosesA);

    console.log("Spiele von A+B: "+insgesamtSpiele);
    console.log(this.heimQuote+" Heimquote, DrawQuote: "+this.drawQuote+", AuswSieg: "+this.AuswQuote);


  }

  onSubmitTip(): void {

    let semaphore = false;
    for (let m of this.matches) {
      if (this.tipp.spiel == m.id) {
        semaphore = true;
      }
    }
    if (!semaphore) {
      this.snackBar.open("keine gültige Spiel ID", "OK")
      return;
    }

    let tipperid;
    for (let tipper of this.alltipper) {
      console.log(tipper.nutzerid + "=" + this.userid)
      if (tipper.nutzerid == BigInt(this.userid) && tipper.tipprundenID == this.tipp.tipprundenid) {
        // @ts-ignore
        tipperid = BigInt(tipper.id);
      }
    }

    this.tipp.tipperID = tipperid;
    this.tipp.tipprundenid = this.tipprundenid;
     //quote ändern!
    console.log(this.tipp.spiel+"hieeeer")

    this.tipp.spiel
    if((this.kontostand - BigInt(this.tipp.betGeld)>=0)) {
      this.TippService.save(this.tipp).subscribe(() => {
          this.TippService.getAllTips().subscribe((data: any) => {
              this.previousTipps = data;
            }
          );
        }
      );

      console.log(this.tipp.spiel)
      this.kontostand = this.kontostand - BigInt(this.tipp.betGeld);
      this.nutzerService.setKontostand(sessionStorage.getItem("id") + "", String(this.kontostand)).subscribe();
      sessionStorage.setItem("kontostand", String(this.kontostand));
      alert("Viel Erfolg bei deiner Wette!")
    }
    else {
      alert("Du wettest mit mehr Geld als du besitzt, mein Freund!")
    }


    this.tipp = new Tipp();
    this.usertips = [];
    this.loadtable = false;
    this.usertiptable = false;
    this.copyid = BigInt("0")


  }
  onChange(ergebnis: string) { //quote:number
    this.winnerQuote(this.tipp.spiel);
    this.tipp.moneyTipp = ergebnis;
    if(ergebnis=="SiegerA") {
      this.tipp.quote=this.heimQuote;
    }
    else if(ergebnis=="SiegerB") {
      this.tipp.quote=this.AuswQuote;
    }
    else {
      this.tipp.quote=this.drawQuote;
    }
  }

}
