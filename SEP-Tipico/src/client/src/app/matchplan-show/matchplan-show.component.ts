import {Component, OnInit} from '@angular/core';
import {Liga} from "../Models/Liga";
import {Match} from "../Models/Match";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../services/match.service";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";

@Component({
  selector: 'app-liga-change',
  templateUrl: './matchplan-show.component.html',
  styleUrls: ['./matchplan-show.component.scss']
})
export class MatchPlanShowComponent implements OnInit {
  match: Match;
  matches: Match[];
  liga: Liga;
  ligen: Liga[];
  team: Team;
  teams: Team[];
  teamNamen: Map<bigint, String>;

  constructor(private route: ActivatedRoute, private TeamService: TeamService, private LigaService: LigaService, private MatchService: MatchService, private router: Router) {
    this.match = new Match;
    this.matches = [];
    this.liga = new Liga();
    this.ligen = [];
    this.team = new Team();
    this.teams = [];
    this.teamNamen = new Map<bigint, String>;
  }

  ngOnInit(): void {
    this.MatchService.getAll().subscribe((data: any) => this.matches = data);
    this.LigaService.getAll().subscribe((data: any) => this.ligen = data);
    this.TeamService.getAll().subscribe((data: any) => {
      this.teams = data;
      this.compileTeamNames()
    });


  }

  onShow() {

  }

  onLoadLiga(): void {
    this.MatchService.getByLiga(this.liga).subscribe((data: any) => this.matches = data);


  }

  compileTeamNames() {
    for (let team of this.teams) {
      if (team.id != null && team.name != null) {
        this.teamNamen.set(team.id, team.name);
      }
    }
  }

  getTeamName(teamid: bigint | undefined): String {
    if (teamid != null) {
      let result = this.teamNamen.get(teamid);
      if (result != null) {
        return result;
      }
    }

    return "kein Name"
  }

}
