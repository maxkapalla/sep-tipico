import {Component, OnInit} from '@angular/core';
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {TeamService} from "../services/team.service";
import {Team} from "../Models/Team";
import {UserStats} from "../Models/UserStats";
import {MatchService} from "../services/match.service";
import {Match} from "../Models/Match";

@Component({
  selector: 'app-liga-see',
  templateUrl: './liga-table.component.html',
  styleUrls: ['./liga-table.component.scss']
})
export class LigaTableComponent implements OnInit {

  ligen: Liga[];
  liga: bigint;
  teams: Team[];
  ligaNamen: Map<bigint, String>;
  stats: UserStats[];
  ligaObj: Liga;
  winnings: Map<bigint, bigint>;
  losses: Map<bigint, bigint>;
  draws: Map<bigint, bigint>;

  constructor(private LigaService: LigaService, private TeamService: TeamService, private matchService: MatchService) {
    this.ligen = [];
    this.teams = [];
    this.liga = BigInt("0");
    this.stats = [];
    this.ligaNamen = new Map<bigint, String>;
    this.ligaObj = new Liga();
    this.winnings = new Map<bigint, bigint>;
    this.losses = new Map<bigint, bigint>;
    this.draws = new Map<bigint, bigint>;
  }


  ngOnInit(): void {
    this.TeamService.getAll().subscribe((data: any) => this.teams = data)
    this.LigaService.getAll().subscribe((data: any) => {
      this.ligen = data;
      this.compileLigen()
      this.sortStats()
    })
  }

  onCalculateWinnings() {
    for (let l of this.ligen) {
      if (this.liga == l.id) {
        this.ligaObj = l;
      }
    }
    this.matchService.getByLiga(this.ligaObj).subscribe((data: Match[]) => {
      for (let s of data) s.scoreTeamA < s.scoreTeamB ? null != s.teamB && null != s.teamA && (this.winnings.has(s.teamB) ? (null != this.winnings.get(s.teamB) && this.winnings.set(s.teamB, BigInt("1") + BigInt(this.winnings.get(s.teamB) + "")), this.losses.has(s.teamA) ? null != this.losses.get(s.teamA) && this.losses.set(s.teamA, BigInt("1") + BigInt(this.losses.get(s.teamA) + "")) : this.losses.set(s.teamA, BigInt("1"))) : (this.winnings.set(s.teamB, BigInt("1")), this.losses.has(s.teamA) ? null != this.losses.get(s.teamA) && this.losses.set(s.teamA, BigInt("1") + BigInt(this.losses.get(s.teamA) + "")) : this.losses.set(s.teamA, BigInt("1")))) : s.scoreTeamA > s.scoreTeamB ? null != s.teamB && null != s.teamA && (this.winnings.has(s.teamA) ? (null != this.winnings.get(s.teamA) && this.winnings.set(s.teamA, BigInt("1") + BigInt(this.winnings.get(s.teamA) + "")), this.losses.has(s.teamB) ? null != this.losses.get(s.teamB) && this.losses.set(s.teamB, BigInt("1") + BigInt(this.losses.get(s.teamB) + "")) : this.losses.set(s.teamB, BigInt("1"))) : (this.winnings.set(s.teamA, BigInt("1")), this.losses.has(s.teamB) ? null != this.losses.get(s.teamB) && this.losses.set(s.teamB, BigInt("1") + BigInt(this.losses.get(s.teamB) + "")) : this.losses.set(s.teamB, BigInt("1")))) : null != s.teamB && null != s.teamA && (this.draws.has(s.teamB) ? null != this.draws.get(s.teamB) && this.draws.set(s.teamB, BigInt("1") + BigInt(this.draws.get(s.teamB) + "")) : this.draws.set(s.teamB, BigInt("1")), this.draws.has(s.teamA) ? null != this.draws.get(s.teamA) && this.draws.set(s.teamA, BigInt("1") + BigInt(this.draws.get(s.teamA) + "")) : this.draws.set(s.teamA, BigInt("1"))); // minification done with https://github.com/mishoo/UglifyJS
      console.log(this.winnings)
      console.log(this.losses)
      console.log(this.draws)
      // @ts-ignore
      const joined = this.teams.map(num => `${num}: ${this.winnings.get(num)}`);
      console.log(joined);
    })
  }


  compileLigen() {
    for (let liga of this.ligen) {
      if (liga.id != null && liga.name != null) {
        this.ligaNamen.set(liga.id, liga.name);

      }
    }
  }

  onShowTeamsInLiga(): void {
    if (this.liga == BigInt("0")) {
      this.TeamService.getAll().subscribe((data: any) => this.teams = data);
    } else {
      this.TeamService.getAllInLiga(this.liga).subscribe((data: any) => {
        this.teams = data;
        this.sortStats()
      });

    }
    this.onCalculateWinnings();
  }


  sortStats() {
    this.teams.sort((a: Team, b: Team) => {
      if (a.points !== b.points) {
        // @ts-ignore
        return a.points - b.points;
      } else if (a.goals !== b.goals) {
        // @ts-ignore
        return a.goals < b.goals ? -1 : 1;
      } else {
        // @ts-ignore
        return a.winnings < b.winnings ? -1 : 1;
      }
    });
    this.teams.reverse()
  }


}

/*
   onCalculateWinnings() {
   for (let l of this.ligen) {
     if (this.liga == l.id) {
       this.ligaObj = l;
     }
   }
   this.matchService.getByLiga(this.ligaObj).subscribe((data: Match[]) => {
     for (let m of data) {
       if (m.scoreTeamA < m.scoreTeamB) {
         if (m.teamB != null && m.teamA != null) {
           if (this.winnings.has(m.teamB)) {
             if (this.winnings.get(m.teamB) != null) {
               this.winnings.set(m.teamB, BigInt("1") + BigInt(this.winnings.get(m.teamB) + ""))
             }
             if (this.losses.has(m.teamA)) {
               if (this.losses.get(m.teamA) != null) {
                 this.losses.set(m.teamA, BigInt("1") + BigInt(this.losses.get(m.teamA) + ""))
               }
             } else {
               this.losses.set(m.teamA, BigInt("1"))
             }
           } else {
             this.winnings.set(m.teamB, BigInt("1"));
             if (this.losses.has(m.teamA)) {
               if (this.losses.get(m.teamA) != null) {
                 this.losses.set(m.teamA, BigInt("1") + BigInt(this.losses.get(m.teamA) + ""))
               }
             } else {
               this.losses.set(m.teamA, BigInt("1"))
             }

           }

         }
       } else if (m.scoreTeamA > m.scoreTeamB) {
         if (m.teamB != null && m.teamA != null) {
           if (this.winnings.has(m.teamA)) {
             if (this.winnings.get(m.teamA) != null) {
               this.winnings.set(m.teamA, BigInt("1") + BigInt(this.winnings.get(m.teamA) + ""))
             }
             if (this.losses.has(m.teamB)) {
               if (this.losses.get(m.teamB) != null) {
                 this.losses.set(m.teamB, BigInt("1") + BigInt(this.losses.get(m.teamB) + ""))
               }
             } else {
               this.losses.set(m.teamB, BigInt("1"))
             }
           } else {
             this.winnings.set(m.teamA, BigInt("1"));
             if (this.losses.has(m.teamB)) {
               if (this.losses.get(m.teamB) != null) {
                 this.losses.set(m.teamB, BigInt("1") + BigInt(this.losses.get(m.teamB) + ""))
               }
             } else {
               this.losses.set(m.teamB, BigInt("1"))
             }

           }

         }
       } else {
         if (m.teamB != null && m.teamA != null) {
           if (this.draws.has(m.teamB)) {
             if (this.draws.get(m.teamB) != null) {
               this.draws.set(m.teamB, BigInt("1") + BigInt(this.draws.get(m.teamB) + ""))
             }
           } else {
             this.draws.set(m.teamB, BigInt("1"))
           }

           if (this.draws.has(m.teamA)) {
             if (this.draws.get(m.teamA) != null) {
               this.draws.set(m.teamA, BigInt("1") + BigInt(this.draws.get(m.teamA) + ""))
             }
           } else {
             this.draws.set(m.teamA, BigInt("1"))
           }
         }
       }
     }
     console.log(this.winnings)
     // @ts-ignore
     const joined = this.teams.map(num => `${num}: ${this.winnings.get(num)}`);
     console.log(joined);
   })
 }
  */
