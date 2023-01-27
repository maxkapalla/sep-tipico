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

  pieStats: UserStats[]
  stats: UserStats[]
  ergebnisStats: ErgebnisStats[]
  ergebnisCounts: number[]


  constructor(private tippRundeService: TippRundeService) {
    this.colors = ["#FF7F50", "#DE3163", "#40E0D0", "#6495ED", "#FFBF00", "#95A5A6", "#DC7633", "#E6B0AA", "#D7BDE2", "#A9CCE3", "#A3E4D7", "#F7DC6F", "#52BE80", "#7B241C", "#5B2C6F", "#CCCCFF","#DFFF00", "#9FE2BF"];
    this.tippRunden = []
    this.runde = new TippRunde()
    this.stats = []
    this.ergebnisStats = []
    this.ergebnisCounts = []
    this.maxValue = 1
    this.pieStats = []
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
    this.tippRundeService.getUserStats(sessionStorage.getItem("id") + "-" + rundenID + "-" + date).subscribe((data: any) => {
      this.stats= data,
    console.log(this.stats),
        this.sortStats(),
      this.createPiechart();
    });

    this.tippRundeService.getErgebnisStats(sessionStorage.getItem("id") + "-" + rundenID).subscribe((data: any) => {
      this.ergebnisStats= data,
        this.createErgebnisCounts(),
        console.log(this.ergebnisStats),
        this.maxValue = Math.max(...this.ergebnisCounts);
    });
  }

  sortStats() {
    this.stats.sort((a: UserStats, b: UserStats) => {
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
    this.stats.reverse()
  }

  createErgebnisCounts() {
    for(var stat of this.ergebnisStats) {
      if(stat.count != undefined) {
        this.ergebnisCounts.push(stat.count)
      }
    }
  }

  createPiechart() {
    for (var st of this.stats) {
      if (st.pointsForUser != 0) {
        this.pieStats.push(st)
      }
    }
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("pieChart");

    let ctx: any = canvas.getContext("2d");

    let totalValue: number = 0;
    let startAngle = 0;

    for (let i = 0; i < this.pieStats.length; i++) {
      // @ts-ignore
      totalValue += this.pieStats[i].pointsForUser;
    }

    for (let i = 0; i < this.pieStats.length; i++) {
      // @ts-ignore
      let sliceAngle = 2 * Math.PI * this.pieStats[i].pointsForUser / totalValue;
      ctx.fillStyle = this.colors[i];
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, canvas.height/2);
      ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2, startAngle, startAngle + sliceAngle);
      ctx.lineTo(canvas.width/2, canvas.height/2);
      ctx.fill();
      startAngle += sliceAngle;
    }
    if(this.stats.length == 0) {
      let angle = 360
      ctx.fillStyle = 'grey'
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, canvas.height/2);
      ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2, 0, 360);
      ctx.lineTo(canvas.width/2, canvas.height/2);
      ctx.fill();
      alert("Diese Tipprunde enthält keine Daten"!)
    }
  }

  getColor(no: number) {
    return this.colors[no]
  }

  //experimentell
  generateColors() {
    let c = []
    for (let i = 0; i < 15; i++) {
      c.push(Math.random().toString(16).slice(-6))
    }
    console.log(c.length)
    return c;
  }
}
