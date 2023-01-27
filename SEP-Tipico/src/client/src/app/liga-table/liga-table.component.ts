import {Component, OnInit} from '@angular/core';
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";
import {UserStats} from "../Models/UserStats";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";

@Component({
  selector: 'app-liga-see',
  templateUrl: './liga-table.component.html',
  styleUrls: ['./liga-table.component.scss']
})
export class LigaTableComponent implements OnInit {

  ergebnisse: TippRunde[]
  ligen: Liga[];
  teams: Team[];
  stats: UserStats[];

  constructor(private LigaService: LigaService, private TeamService: TeamService, private tippRundeService: TippRundeService) {
    this.ligen = [];
    this.teams = [];
    this.ergebnisse = [];
    this.stats = [];
  }


  ngOnInit(): void {
    this.tippRundeService.getTippRundenByMember(sessionStorage.getItem("id") + "").subscribe((data: any) => {
      this.ergebnisse = data

      if(this.ergebnisse[0].id != null) {
        this.getStats(this.ergebnisse[0].id.toString())
      }
    });

  }

  getStats(rundenID: string) {
    let date = sessionStorage.getItem("datum")
    this.tippRundeService.getUserStats(sessionStorage.getItem("id") + "-" + rundenID + "-" + date).subscribe((data: any) => {
      this.stats= data,
        this.stats = this.sortStats(this.stats)
      });
  }

  sortStats(stats: UserStats[]) {
    let userStats = stats;
    userStats.sort((a: UserStats, b: UserStats) => {
      if (a.pointsForTable !== b.pointsForTable) {
        // @ts-ignore
        return a.pointsForTable - b.pointsForTable;
      } else if (a.tordif !== b.tordif) {
        // @ts-ignore
        return a.tordif < b.tordif ? -1 : 1;
      } else {
        // @ts-ignore
        return a.wins < b.wins ? -1 : 1;
      }
    });
    userStats.reverse()
    return userStats
  }


}
