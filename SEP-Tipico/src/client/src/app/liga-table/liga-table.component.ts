import {Component, OnInit} from '@angular/core';
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";
import {UserStats} from "../Models/UserStats";

@Component({
  selector: 'app-liga-see',
  templateUrl: './liga-table.component.html',
  styleUrls: ['./liga-table.component.scss']
})
export class LigaTableComponent implements OnInit {

  ligen: Liga[];
  liga: bigint;
  teams: Team[];
  ligaNamen: Map<bigint, String>;
  stats: UserStats[];

  constructor(private LigaService: LigaService, private TeamService: TeamService) {
    this.ligen = [];
    this.teams = [];
    this.liga = BigInt("0");
    this.stats = [];
    this.ligaNamen = new Map<bigint, String>;
  }


  ngOnInit(): void {
    this.TeamService.getAll().subscribe((data: any) => this.teams = data)
    this.LigaService.getAll().subscribe((data: any) => {
      this.ligen = data;
      this.compileLigen()
      this.sortStats()
    })
  }

  compileLigen() {
    for (let liga of this.ligen) {
      if (liga.id != null && liga.name != null) {
        this.ligaNamen.set(liga.id, liga.name);

      }
    }
  }

  onShowTeamsInLiga(): void {
    if (this.liga == BigInt("0")) {
      this.TeamService.getAll().subscribe((data: any) => this.teams = data);
    } else {
      this.TeamService.getAllInLiga(this.liga).subscribe((data: any) => {
        this.teams = data;
        this.sortStats()});

    }

  }


  sortStats() {
    this.teams.sort((a: Team, b: Team) => {
      if (a.points !== b.points) {
        // @ts-ignore
        return a.points - b.points;
      } else if (a.goals !== b.goals) {
        // @ts-ignore
        return a.goals < b.goals ? -1 : 1;
      } else {
        // @ts-ignore
        return a.winnings < b.winnings ? -1 : 1;
      }
    });
    this.teams.reverse()
  }


}
