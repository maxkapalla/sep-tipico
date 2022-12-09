import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Match} from "../Models/Match";
import {MatchService} from "../services/match.service";
import {TippService} from "../services/tipp.service";
import {TippRundeService} from "../services/tipp-runde.service";
import {Tipp} from "../Models/TippN";
import {TippRunde} from "../Models/TippRunde";

@Component({
  selector: 'app-tipp-abgeben',
  templateUrl: './tipp-abgeben.component.html',
  styleUrls: ['./tipp-abgeben.component.scss']
})
export class TippAbgebenComponent implements OnInit {

  ligen: Liga[];
  matches: Match[];

  tipprunden: TippRunde[];
  matchesMap: Map<bigint, Match>;
  match: Match;
  ligaNamen: Map<bigint, String>;
  ligaid: bigint;
  liga: Liga;

  tipp: Tipp;

  matchid: bigint;

  tipprunde: TippRunde;

  constructor(private route: ActivatedRoute, private router: Router, private LigaService: LigaService, private TeamService: TeamService, private MatchService: MatchService, private TippService: TippService, private TippRundeService: TippRundeService) {
    this.ligen = [];
    this.matches = [];
    this.tipprunden = [];
    this.ligaNamen = new Map<bigint, String>;
    this.ligaid = BigInt("0")
    this.liga = new Liga();
    this.match = new Match();
    this.tipp = new Tipp();
    this.matchid = BigInt("0");
    this.matchesMap = new Map<bigint, Match>;
    this.tipprunde = new TippRunde();


  }


  ngOnInit(): void {
    this.MatchService.getAll().subscribe((data: any) => this.matches = data)
    this.LigaService.getAll().subscribe((data: any) => {
      this.ligen = data;
      this.compileLigen()
    })
    this.TippRundeService.getAll().subscribe((data: any) => {
      this.tipprunden = data;
    })

  }

  compileLigen() {
    for (let liga of this.ligen) {
      if (liga.id != null && liga.name != null) {
        this.ligaNamen.set(liga.id, liga.name);

      }
    }
  }

  onSelectTippRunde(): void {
    if (this.tipprunde.liga != null) {
      this.ligaid = BigInt(this.tipprunde.liga);
    }


  }

  onShowMatchesInLiga(): void {
    console.log("Selected ligaid: " + this.ligaid)
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

  }


  onSubmitTip(): void {

    this.TippService.save(this.tipp).subscribe();
    console.log(this.tipp)
    //his.matches.this.TippService.save(this.tipp).subscribe();

  }

}
