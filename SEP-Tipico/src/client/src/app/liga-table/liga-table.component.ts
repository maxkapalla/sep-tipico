import {Component, OnInit} from '@angular/core';
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";
import {UserStats} from "../Models/UserStats";
import {ErgebnisStats} from "../Models/ErgebnisStats";
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
  maxValue
  teams: Team[];
  stats: UserStats[];
  ergebnisSt: ErgebnisStats[]
  ergebnisC: number[]

  constructor(private LigaService: LigaService, private TeamService: TeamService, private tippRundeService: TippRundeService) {
    this.ligen = [];
    this.teams = [];
    this.ergebnisse = [];
    this.ergebnisC = [];
    this.ergebnisSt = [];
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
        this.stats.sort((a, b) => (a.pointsForTable < b.pointsForTable) ? 1 : -1);
      ;});
    this.tippRundeService.getErgebnisStats(sessionStorage.getItem("id") + "-" + rundenID).subscribe((data: any) => {
      this.ergebnisSt= data,
        this.createErgebnisC(),
        this.maxValue = Math.max(...this.ergebnisC);
    });
  }

  createErgebnisC() {
    for(var stat of this.ergebnisSt) {
      if(stat.count != undefined) {
        this.ergebnisC.push(stat.count)
      }
    }
  }

}
