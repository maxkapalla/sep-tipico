import {Component, OnInit} from '@angular/core';
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";

@Component({
  selector: 'app-liga-see',
  templateUrl: './liga-table.component.html',
  styleUrls: ['./liga-table.component.scss']
})
export class LigaTableComponent implements OnInit {

  ligen: Liga[];
  teams: Team[];


  constructor(private LigaService: LigaService, private TeamService: TeamService) {
    this.ligen = [];
    this.teams = [];
  }


  ngOnInit(): Team[] {
    this.TeamService.getAll().subscribe((data: any) => this.teams = data);
    return this.teams

  }
}
