import { Component, OnInit } from '@angular/core';
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import {UserStats} from "../Models/UserStats";
import {ErgebnisStats} from "../Models/ErgebnisStats";

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {

  colors: string[]
  maxValue
  tippRunden: TippRunde[]
  runde: TippRunde

  stats: UserStats[]
  ergebnisStats: ErgebnisStats[]
  ergebnisCounts: number[]


  constructor(private tippRundeService: TippRundeService) {
    this.colors = ["#FF7F50", "#DE3163", "#40E0D0", "#6495ED", "#CCCCFF", "#FFBF00","#DFFF00",  "#9FE2BF", "#95A5A6", "#DC7633", "#E6B0AA", "#D7BDE2", "#A9CCE3", "#A3E4D7", "#F7DC6F", "#52BE80", "#7B241C", "#5B2C6F"];
    this.tippRunden = []
    this.runde = new TippRunde()
    this.stats = []
    this.ergebnisStats = []
    this.ergebnisCounts = []
    this.maxValue = 1
  }

  ngOnInit(): void {
    this.tippRundeService.getTippRundenByMember(sessionStorage.getItem("id") + "").subscribe((data: any) => {
      this.tippRunden = data

      if(this.tippRunden[0].id != null) {
        this.getStats(this.tippRunden[0].id.toString())
      }
    });

  }

  getStats(rundenID: string) {
    let date = sessionStorage.getItem("datum")
    console.log("rundenid angefragt " + rundenID + " date: " + date)
    this.tippRundeService.getUserStats(sessionStorage.getItem("id") + "-" + rundenID + "-" + date).subscribe((data: any) => {
      this.stats= data,
    console.log(this.stats),
        this.stats = this.sortStats(this.stats)
      this.createPiechart();});
    this.tippRundeService.getErgebnisStats(sessionStorage.getItem("id") + "-" + rundenID).subscribe((data: any) => {
      this.ergebnisStats= data,
        this.createErgebnisCounts(),
        console.log(this.ergebnisStats),
        this.maxValue = Math.max(...this.ergebnisCounts);
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

  createErgebnisCounts() {
    for(var stat of this.ergebnisStats) {
      if(stat.count != undefined) {
        this.ergebnisCounts.push(stat.count)
      }
    }
  }

  createPiechart() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("pieChart");

    let ctx: any = canvas.getContext("2d");

    let totalValue: number = 0;
    let startAngle = 0;

// Berechne den Gesamtwert aller Daten
    for (let i = 0; i < this.stats.length; i++) {
      // @ts-ignore
      totalValue += this.stats[i].pointsForUser;
    }
    console.log("userpoints total: " + totalValue)

// Zeichne das Diagramm
    for (let i = 0; i < this.stats.length; i++) {
      // @ts-ignore
      let sliceAngle = 2 * Math.PI * this.stats[i].pointsForUser / totalValue;
      ctx.fillStyle = this.colors[i];
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, canvas.height/2);
      ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2, startAngle, startAngle + sliceAngle);
      ctx.lineTo(canvas.width/2, canvas.height/2);
      ctx.fill();
      startAngle += sliceAngle;
    }
  }

  getColor(no: number) {
    return this.colors[no]
  }

  generateColors() {
    let c = []
    for (let i = 0; i < 15; i++) {
      c.push(Math.random().toString(16).slice(-6))
    }
    console.log(c.length)
    return c;
  }
}
