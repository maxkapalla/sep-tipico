import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Match} from "../Models/Match";
import {MatchService} from "../services/match.service";
import {TippService} from "../services/tipp.service";
import {TippRunde} from "../Models/TippRunde";
import {Team} from "../Models/Team";

@Component({
  selector: 'app-tipp-hilfe',
  templateUrl: './tipphilfe.component.html',
  styleUrls: ['./tipphilfe.component.scss']
})
export class TippHilfeComponent implements OnInit {

  ligen: Liga[];
  matches: Match[];

  tipprunden: TippRunde[];
  matchesMap: Map<bigint, Match>;
  match: Match;
  ligaNamen: Map<bigint, String>;
  ligaid: bigint;
  liga: Liga;

  hilfe: Map<bigint, number>;

  matchid: bigint;

  teams: Team[];

  quote: number;


  constructor(private route: ActivatedRoute, private router: Router, private LigaService: LigaService, private TeamService: TeamService, private MatchService: MatchService, private TippService: TippService) {
    this.ligen = [];
    this.matches = [];
    this.tipprunden = [];
    this.ligaNamen = new Map<bigint, String>;
    this.ligaid = BigInt("0")
    this.liga = new Liga();
    this.match = new Match();
    this.matchid = BigInt("0");
    this.matchesMap = new Map<bigint, Match>;
    this.teams = [];
    this.hilfe = new Map<bigint, number>;
    this.quote = 0;


  }


  ngOnInit(): void {
    /*   this.MatchService.getAll().subscribe((data: any) => {
         this.matches = data;
         console.log(this.matches);
       })*/
    this.LigaService.getAll().subscribe((data: any) => {
      this.ligen = data;
      this.compileLigen()
      console.log(this.ligen);
    })


  }

  compileLigen() {
    for (let liga of this.ligen) {
      if (liga.id != null && liga.name != null) {
        this.ligaNamen.set(liga.id, liga.name);

      }
    }
  }


  onSelectLiga() {

    for (let ligat of this.ligen) {
      if (ligat.id != null) {
        if (this.ligaid == ligat.id) {
          this.liga = ligat;
        }

      }
    }

    this.MatchService.getByLiga(this.liga).subscribe((data: any) => {
      this.matches = data;
      console.log(this.matches);


      if (this.liga.id != null) {
        this.TeamService.getAllInLiga(this.liga.id).subscribe((data: any) => {
          this.teams = data;
          console.log(this.teams);


          for (let t of this.teams) {
            if (t.id != null) {
              this.hilfe.set(t.id, 0)
            }
          }

          for (let m of this.matches) {
            if (m.scoreTeamA && m.scoreTeamB && m.teamA && m.teamB) {
              let valA = this.hilfe.get(m.teamA);
              let valB = this.hilfe.get(m.teamB);
              if (m.scoreTeamA > m.scoreTeamB) {

                if (valA != null) {
                  valA += 1 + 1 / (Number(m.scoreTeamA) / Number(m.scoreTeamB));
                }
                if (valB != null) {
                  valB += Number(m.scoreTeamB) / Number(m.scoreTeamA);
                }

              } else if (m.scoreTeamA == m.scoreTeamB) {
                if (valA != null) {
                  valA += Number(m.scoreTeamA + m.scoreTeamB) / 10;
                }
                if (valB != null) {
                  valB += Number(m.scoreTeamA + m.scoreTeamB) / 10;
                }
              } else {

                if (valA != null) {
                  valA += 1 + 1 / (Number(m.scoreTeamB) / Number(m.scoreTeamA));
                }
                if (valB != null) {
                  valB += Number(m.scoreTeamA) / Number(m.scoreTeamB);
                }
              }
              if (valB != null && valA != null) {
                this.hilfe.set(m.teamA, valA);
                this.hilfe.set(m.teamB, valB);
              }


            }

          }


        });

      }


    })


  }

  onShowTip(): void {
    console.log(this.match.teamA, this.match.teamB)

    if (this.match.teamA != null && this.match.teamB != null) {
      let a = 0;
      let b = 0;
      this.hilfe.forEach((value, key, map) => {

        if (key == this.match.teamA) {
          a = value;
        }
        if (key == this.match.teamB) {
          b = value;
        }

      })
      
      this.quote = Number((a / b).toFixed(2));


    }

  }

}
