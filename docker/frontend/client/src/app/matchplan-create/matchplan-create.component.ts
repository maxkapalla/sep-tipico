import {Component, OnInit} from '@angular/core';
import {Match} from "../Models/Match";
import {Router} from "@angular/router";
import {MatchService} from "../services/match.service";
import {LigaService} from "../services/liga.service";
import {Liga} from "../Models/Liga";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";


@Component({
  selector: 'matchplan-create',
  templateUrl: './matchplan-create.component.html',
  styleUrls: ['./matchplan-create.component.scss']
})
export class MatchPlanCreateComponent implements OnInit {


  match: Match;
  matches: Match[];
  liga: Liga;
  ligen: Liga[];
  teamA: Team;
  teamB: Team;
  teams: Team[];
  teamsNamen: Team[];
  teamNamen: Map<bigint, String>;


  constructor(private MatchService: MatchService, private LigaService: LigaService, private TeamService: TeamService, private router: Router) {
    this.match = new Match;
    this.matches = [];
    this.liga = new Liga();
    this.ligen = [];
    this.teams = [];
    this.teamA = new Team();
    this.teamB = new Team();
    this.teamsNamen = []
    this.teamNamen = new Map<bigint, String>;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('role') == "user") { //falls user dann route zu home
      this.router.navigate(['/home'])
    }

    this.TeamService.getAll().subscribe((data: any) => {
      this.teamsNamen = data;
      this.compileTeamNames();
    })

    if (this.liga.id == null) {
      this.MatchService.getAll().subscribe((data: any) => this.matches = data);
    } else {
      this.MatchService.getByLiga(this.liga).subscribe((data: any) => this.matches = data);
      this.TeamService.getAllInLiga(this.liga.id).subscribe((data: any) => this.teams = data);
    }

    this.LigaService.getAll().subscribe((data: any) => this.ligen = data);
  }

  onSave(): void {
    this.MatchService.create(this.match).subscribe(() => this.ngOnInit());

  }

  onLoadLiga(): void {
    this.MatchService.getByLiga(this.liga).subscribe((data: any) => this.matches = data);
    if (this.liga.id != null) {
      this.TeamService.getAllInLiga(this.liga.id).subscribe((data: any) => this.teams = data);

    }

  }

  compileTeamNames() {
    for (let team of this.teamsNamen) {
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

  onFlush(): void {
    this.MatchService.flush().subscribe(() => this.ngOnInit());
  }

}
