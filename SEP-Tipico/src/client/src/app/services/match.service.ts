import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Match} from "../Models/Match";
import {Observable} from "rxjs";
import {Liga} from "../Models/Liga";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class MatchService {

  private matchURL: String;

  constructor(private http: HttpClient) {
    this.matchURL = 'http://localhost:8080/spiel'
  }


  create(spiel: Match): Observable<Match> {

    return this.http.post<Match>(this.matchURL + "/save", spiel);


  }

  getByTeam(teams: bigint[]): Observable<Match[]> {
    return this.http.post<Match[]>(this.matchURL + "/team", teams);
  }

  getByLiga(liga: Liga): Observable<Match[]> {

    return this.http.post<Match[]>(this.matchURL + "/liga", liga);
  }


  flush(): Observable<any> {
    return this.http.post(this.matchURL + "/flush", null);
  }

  randomCreate(): Observable<any> {
    return this.http.get(this.matchURL + "/random")
  }

  getAll(): Observable<Match[]> {

    return this.http.post<Match[]>(this.matchURL + "/all", null);
  }

  delete(spiel: Match): Observable<Match> {

    return this.http.post<Match>(this.matchURL + "/delete", spiel);

  }

}
