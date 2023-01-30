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


require('../patch.js')


@Component({
  selector: 'app-geld-wette-abgeben',
  templateUrl: './geld-wette-abgeben.component.html',
  styleUrls: ['./geld-wette-abgeben.component.scss']
})
export class GeldWetteAbgebenComponent implements OnInit {

  ligen: Liga[];
  matches: Match[];

  tipprunden: TippRunde[];
  matchesMap: Map<bigint, Match>;
  match: Match;
  matchMitDate: Match;
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
  ergebnis:string="";
  copyid: bigint;
  tipprundenraw: TippRunde[];

  constructor(private router: Router,
              private LigaService: LigaService, private TeamService: TeamService,
              private MatchService: MatchService, private TippService: TippService,
              private TippRundeService: TippRundeService,
              private nutzerService: NutzerService) {
    this.ligen = [];
    this.matches = [];
    this.tipprunden = [];
    this.tipprundenraw = [];
    this.ligaNamen = new Map<bigint, String>;
    this.ligaid = BigInt("0")
    this.liga = new Liga();
    this.match = new Match();
    this.matchMitDate=new Match();
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

    if (this.ligaid == BigInt("0")) {
      this.MatchService.getAll().subscribe((data: any) => this.matches = data);
    } else if (this.ligaid != null) {
      for (let ligat of this.ligen) {
        if (ligat.id != null && ligat.name != null) {
          if (this.ligaid == ligat.id) {
            this.liga = ligat;
          }

        }
      }

      this.MatchService.getByLiga(this.liga).subscribe((data: any) => this.matches = data);

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


  onSubmitTip(): void {
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
    this.tipp.quote=2; //quote ändern!
    console.log(this.tipp)

    this.tipp.spiel
    if((this.kontostand - BigInt(this.tipp.betGeld)>=0)) {
      this.TippService.save(this.tipp).subscribe(() => {
          this.TippService.getAllTips().subscribe((data: any) => {
              this.previousTipps = data;
            }
          );
        }
      );
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
    this.tipp.moneyTipp = ergebnis;
    //this.tipp.quote=quote;
  }

  requestBet() {

    this.MatchService.getSpielByID(Number(this.tipp.spiel)).subscribe((data: any) => this.matchMitDate = data);
    console.log(this.matchMitDate.id)
    console.log(Number(this.tipp.spiel))
  //  console.log(this.birthdate)
  //  var splitstr = this.birthdate.split('.')+"";
  //  this.datum = splitstr[3] + splitstr[4]+ "." + splitstr[0] +splitstr[1]+ "." + splitstr[6]+splitstr[7]+splitstr[8]+splitstr[9];
 //   console.log(this.datum)
    //this.datum=this.datePipe.transform(this.datum, 'MM.dd.yyyy')

 //   if(this.datum){
      var timeDiff = Math.abs(Date.now()- this.matchMitDate.date );
      //this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    console.log(timeDiff)
 //   }
    if(timeDiff<=0) {
      alert("Match wurde schon gespielt!")
    }
    else {
      alert("Wette ist ok");
    }
  }

}
