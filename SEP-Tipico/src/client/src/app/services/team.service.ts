import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../Models/Team";
import {Nutzer} from "../Models/Nutzer";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class TeamService {

  private teamURL: String;


  constructor(private http: HttpClient) {
    this.teamURL = 'http://localhost:8080/team'
  }

  save(team: Team): Observable<Team> {

    // window.location.reload();

    return this.http.post<Team>(this.teamURL + "/save", team);

  }

  saveByName(team: Team): Observable<Team> {

    // window.location.reload();

    return this.http.post<Team>(this.teamURL + "/save/name", team);

  }

  getAll(): Observable<Team[]> {

    return this.http.post<Team[]>(this.teamURL + "/all", null);
  }

  getTeamByID(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamURL + "/id", team);
  }

  public getTeamByIDs(teamid1: bigint | undefined, teamid2: bigint | undefined, teamid3: bigint | undefined): Observable<Team[]> {
    return this.http.get<Team[]>('http://localhost:8080/team/' + teamid1 + '/' + teamid2 + '/' + teamid3)
  }

  getTeamByName(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamURL + "/name", team);
  }


  getAllInLiga(liga: bigint): Observable<Team[]> {
    return this.http.post<Team[]>(this.teamURL + "/all/liga", liga.toString());
  }

  delete(team: Team): Observable<Team> {

    return this.http.post<Team>(this.teamURL + "/delete", team);

  }

  flush(): Observable<Object> {
    return this.http.get(this.teamURL + "/flush");
  }

  random(): Observable<Object> {
    return this.http.get(this.teamURL + "/random");
  }

}
