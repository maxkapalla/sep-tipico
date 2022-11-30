import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Team} from "../Models/Team";
import {TeamService} from "../services/team.service";
import {LigaService} from "../services/liga.service";
import {Liga} from "../Models/Liga";


@Component({
  selector: 'app-team-show',
  templateUrl: './team-show.component.html',
  styleUrls: ['./team-show.component.scss']
})
export class TeamShowComponent implements OnInit {

  teams: Team[];
  liga: bigint;
  ligen: Liga[];
  ligaNamen: Map<bigint, String>;


  constructor(private route: ActivatedRoute, private TeamService: TeamService, private LigaService: LigaService, private router: Router) {
    this.teams = [];
    this.liga = BigInt("0");
    this.ligen =[];
    this.ligaNamen=new Map<bigint, String>;

  }


  ngOnInit(): void {
    this.TeamService.getAll().subscribe((data: any) => this.teams = data)
    this.LigaService.getAll().subscribe((data:any)=>{this.ligen=data; this.compileLigen()})



  }
  compileLigen(){
    for(let liga of this.ligen){
      if(liga.id!=null && liga.name!=null){
        this.ligaNamen.set(liga.id, liga.name);

      }
    }
  }

  onShowTeamsInLiga(): void {
    if (this.liga == BigInt("0")) {
      this.TeamService.getAll().subscribe((data: any) => this.teams = data);
    } else {
      this.TeamService.getAllInLiga(this.liga).subscribe((data: any) => this.teams = data);

    }

  }


  onFlush() {
    this.TeamService.flush().subscribe(() => this.ngOnInit());
    this.TeamService.getAll().subscribe((data: any) => this.teams = data);
  }

  getLigaName(ligaid: bigint|undefined): String{

    if(ligaid!=null){

      let result = this.ligaNamen.get(ligaid);
      if(result!=null){
        return  result;
      }
    }



    return "kein Name"}


}
