import {Component, OnInit} from '@angular/core';
import {Liga} from "../Models/Liga";
import {Match} from "../Models/Match";
import {MatchService} from "../services/match.service";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";
import {TippService} from "../services/tipp.service";
import {Tipper} from "../Models/Tipper";
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";

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
  topThree: Tipper[];
  topThreeNames: Nutzer[];

  constructor(private TeamService: TeamService,
              private LigaService: LigaService, private MatchService: MatchService,
              private tippService: TippService, private nutzerService: NutzerService) {
    this.match = new Match;
    this.matches = [];
    this.liga = new Liga();
    this.ligen = [];
    this.team = new Team();
    this.teams = [];
    this.teamNamen = new Map<bigint, String>;
    this.topThree = [];
    this.topThreeNames = [];
  }

  ngOnInit(): void {
    this.MatchService.getAll().subscribe((data: any) => this.matches = data);
    this.LigaService.getAll().subscribe((data: any) => this.ligen = data);
    this.TeamService.getAll().subscribe((data: any) => {
      this.teams = data;
      this.compileTeamNames()
    });
  }

  markFutureMatches(date: string): boolean {
    let datum = sessionStorage.getItem('datum') + ""
    date = date.slice(0, 10)
    let splitstr1 = date.split('-')
    let splitstr2 = datum.split('.')
    if (+splitstr1[0] <= +splitstr2[2]) {
      if (+splitstr1[1] < +splitstr2[1]) {
        return true;
      } else if (+splitstr1[1] == +splitstr2[1]) {
        if (+splitstr1[2] <= +splitstr2[0]) {
          return true;
        }
      }
    }
    return false;
  }

  onLoadLiga(): void {
    this.MatchService.getByLiga(this.liga).subscribe((data: any) => this.matches = data);
    this.tippService.getTopThree(this.liga).subscribe((data: any) => this.topThree = data)
    setTimeout(() => {
      if (this.topThree.length != 0)
        for(let top of this.topThree){
          this.nutzerService.getNutzerByID(top.nutzerid.toString()).subscribe((data:Nutzer) => {this.topThreeNames.push(data)})
        }
    }, 200);
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
