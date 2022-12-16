import {Component, OnInit} from '@angular/core';
import {LigaService} from "../services/liga.service";
import {Liga} from "../Models/Liga";
import {TippService} from "../services/tipp.service";
import {Tipper} from "../Models/Tipper";
import {Nutzer} from "../Models/Nutzer";
import {NutzerService} from "../services/nutzer.service";

@Component({
  selector: 'app-topthreeteams',
  templateUrl: './topthree-team.component.html',
  styleUrls: ['./topthree-team.component.scss']
})
export class TopthreeteamComponent implements OnInit {
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

  onLoadTopThreeteams() {
    this.tippService.getTopThree(this.liga).subscribe((data: any) => this.topThree = data)
    console.log(this.topThree.length)
    setTimeout(() => {
      if (this.topThree.length != 0)
        this.nutzerService.getNutzersByIds(this.topThree[0].nutzerid, this.topThree[1].nutzerid, this.topThree[2].nutzerid).subscribe((data: any) => this.topThreeNames = data)
    }, 200);

  }
}
