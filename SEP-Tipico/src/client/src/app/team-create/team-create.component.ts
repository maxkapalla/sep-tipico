import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Team} from "../Models/Team";
import {TeamService} from "../services/team.service";
import {LigaService} from "../services/liga.service";
import {Liga} from "../Models/Liga";

@Component({
  selector: 'app-liga-change',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})
export class TeamCreateComponent implements OnInit {

  team: Team;
  teams: Team[];
  ligen: Liga[];
  createButtonText: String;

  constructor(private TeamService: TeamService, private LigaService: LigaService, private router: Router) {
    this.team = new Team;
    this.ligen = [];
    this.teams = [];
    this.createButtonText = "Team erstellen";


  }

  ngOnInit(): void {
    if (sessionStorage.getItem('role') == "user") { //falls user dann route zu home
      this.router.navigate(['/home'])
    }
    this.LigaService.getAll().subscribe((data: any) => this.ligen = data);
    this.TeamService.getAll().subscribe((data: any) => this.teams = data);
  }

  onSubmit(): void {
    this.TeamService.save(this.team).subscribe(() => this.ngOnInit());


  }

  onDeleteTeam() {
    this.TeamService.delete(this.team).subscribe(() => this.ngOnInit());
  }

  onLoadTeam(): Team {

    this.createButtonText = "Team ändern"

    this.TeamService.getTeamByID(this.team).subscribe((data: any) => this.team = data);
    return this.team;
  }

  resetButtonText(): void {
    this.createButtonText = "Team erstellen"
    this.team = new Team();
  }

  onRandom() {
    this.TeamService.random().subscribe(() => this.ngOnInit());
  }


}
