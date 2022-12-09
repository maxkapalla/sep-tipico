import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Match} from "../Models/Match";
import {MatchService} from "../services/match.service";
import {TippService} from "../services/tipp.service";
import {Tipp} from "../Models/TippN";
import {TippRunde} from "../Models/TippRunde";

@Component({
  selector: 'app-tipp-hilfe',
  templateUrl: './tipphilfe.component.html',
  styleUrls: ['./tipphilfe.component.scss']
})
export class TipphilfeComponent implements OnInit {

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


  constructor(private route: ActivatedRoute, private router: Router, private LigaService: LigaService, private TeamService: TeamService, private MatchService: MatchService, private TippService: TippService) {
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


  }


  ngOnInit(): void {
    this.MatchService.getAll().subscribe((data: any) => this.matches = data)
    this.LigaService.getAll().subscribe((data: any) => {
      this.ligen = data;
      this.compileLigen()
    })


  }

  compileLigen() {
    for (let liga of this.ligen) {
      if (liga.id != null && liga.name != null) {
        this.ligaNamen.set(liga.id, liga.name);

      }
    }
  }


}
