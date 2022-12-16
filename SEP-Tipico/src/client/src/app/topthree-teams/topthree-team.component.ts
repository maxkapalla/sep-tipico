import {Component, OnInit} from '@angular/core';
import {LigaService} from "../services/liga.service";
import {Liga} from "../Models/Liga";
import {TippService} from "../services/tipp.service";
import {Tipper} from "../Models/Tipper";
import {Nutzer} from "../Models/Nutzer";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";


@Component({
  selector: 'app-topthree-team',
  templateUrl: './topthree-team.component.html',
  styleUrls: ['./topthree-team.component.spec.ts']
})
export class TopthreeTeamComponent implements OnInit {
  liga: Liga;
  ligen: Liga[];
  topThree: Team[];
  topThreeNames: Nutzer[];
  alert: string;

  constructor(private teamService: TeamService, private ligaService: LigaService, private tippService: TippService) {
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
    this.tippService.getTopThreeTeams(this.liga).subscribe((data: any) => this.topThree = data)
    console.log(this.topThree.length)
    setTimeout(() => {
      if (this.topThree.length != 0)
        this.teamService.getTeamByIDs(this.topThree[0].teamid, this.topThree[1].teamid, this.topThree[2].teamid).subscribe((data: any) => this.topThreeNames = data)
    }, 200);

  }
}
