import {Component, OnInit} from '@angular/core';
import {LigaService} from "../services/liga.service";
import {Liga} from "../Models/Liga";
import {TippService} from "../services/tipp.service";
import {Tipper} from "../Models/Tipper";
import {Nutzer} from "../Models/Nutzer";
import {NutzerService} from "../services/nutzer.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";


@Component({
  selector: 'app-topthree',
  templateUrl: './topthree.component.html',
  styleUrls: ['./topthree.component.scss']
})
export class TopthreeComponent implements OnInit {
  liga: Liga;
  ligen: Liga[];
  topThree: Tipper[];
  topThreeNames: Nutzer[];
  alert: string;

  constructor(private ligaService: LigaService, private tippService: TippService, private nutzerService: NutzerService) {
    this.ligen = [];
    this.liga = new Liga();
    this.topThree = [];
    this.topThreeNames = [];
    this.alert = ""
  }

  ngOnInit(): void {
    this.ligaService.getAll().subscribe((data: any) => this.ligen = data);
  }

  onLoadTopThree() {
    this.tippService.getTopThree(this.liga).subscribe((data: any) => this.topThree = data)
    console.log(this.topThree.length)
    setTimeout(() => {
      if (this.topThree.length != 0)
        this.nutzerService.getNutzersByIds(this.topThree[0].nutzerid, this.topThree[1].nutzerid, this.topThree[2].nutzerid).subscribe((data: any) => this.topThreeNames = data)
    }, 200);

  }
}
