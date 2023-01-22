import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {

  mannschaften: number[];
  colors: string[]
  maxValue


  constructor() {
    this.mannschaften = [20, 30, 10, 20, 10, 10];
    this.colors = ["red", "green", "blue", "yellow", "orange", "purple"];
    this.maxValue = Math.max(...this.mannschaften);
  }

  ngOnInit(): void {
    this.createPiechart();

  }

  createPiechart() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("pieChart");

    let ctx: any = canvas.getContext("2d");

    let totalValue: number = 0;
    let startAngle = 0;

// Berechne den Gesamtwert aller Daten
    for (let i = 0; i < this.mannschaften.length; i++) {
      totalValue += this.mannschaften[i];
    }

// Zeichne das Diagramm
    for (let i = 0; i < this.mannschaften.length; i++) {
      let sliceAngle = 2 * Math.PI * this.mannschaften[i] / totalValue;
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


}
