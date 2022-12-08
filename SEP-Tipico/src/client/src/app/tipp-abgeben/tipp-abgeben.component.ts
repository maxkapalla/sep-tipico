import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Match} from "../Models/Match";
import {MatchService} from "../services/match.service";
import {TippService} from "../services/tipp.service";
import {Tipp} from "../Models/TippN";

@Component({
  selector: 'app-tipp-abgeben',
  templateUrl: './tipp-abgeben.component.html',
  styleUrls: ['./tipp-abgeben.component.scss']
})
export class TippAbgebenComponent implements OnInit {

  ligen: Liga[];
  matches: Match[];
  match: Match;
  ligaNamen: Map<bigint, String>;
  liga: Liga;

  tipp: Tipp;


  constructor(private route: ActivatedRoute, private router: Router, private LigaService: LigaService, private TeamService: TeamService, private MatchService: MatchService, private TippService: TippService) {
    this.ligen = [];
    this.matches = [];
    this.ligaNamen = new Map<bigint, String>;
    this.liga = new Liga();
    this.match = new Match();
    this.tipp = new Tipp();

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

  onShowMatchesInLiga(): void {
    if (this.liga.id == BigInt("0")) {
      this.MatchService.getAll().subscribe((data: any) => this.matches = data);
    } else if (this.liga.id != null) {
      this.MatchService.getByLiga(this.liga).subscribe((data: any) => this.matches = data);

    }

  }

}
