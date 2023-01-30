import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tipp} from "../Models/TippN";
import {Liga} from "../Models/Liga";
import {Tipper} from "../Models/Tipper";
import {TippMail} from "../Models/TippMail";
import {TippContainer} from "../Models/TippContainer";
import {Match} from "../Models/Match";
import {TippRunde} from "../Models/TippRunde";
import {Team} from "../Models/Team";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class TippService {

  tippMail: TippMail;
  tipps: Tipp[];
  tippers: Tipper[];
  matches: Match[];
  tippRunden: TippRunde[];
  teams: Team[];

  private tippURL: string;
  private tipperURL: string;
  private matchURl: string;
  private rundenURL: string;
  private teamURL: string;

  constructor(private http: HttpClient) {
    this.tippMail = new TippMail();
    this.tippURL = 'http://localhost:8080/tippn'
    this.tipperURL = 'http://localhost:8080/tipper'
    this.matchURl = 'http://localhost:8080/spiel'
    this.rundenURL = 'http://localhost:8080/tippRunde'
    this.teamURL = 'http://localhost:8080/team'
    this.tipps = [];
    this.tippers = [];
    this.matches = [];
    this.tippRunden = [];
    this.teams = [];
  }

  save(tipp: Tipp): Observable<Tipp> {

    // window.location.reload();

    return this.http.post<Tipp>(this.tippURL + "/save", tipp);

  }

  saveTipper(nickname: Tipper): Observable<Tipper> {
    console.log(nickname)
    return this.http.post<Tipper>(this.tipperURL + "/save", nickname);
  }

  getTopThree(liga: Liga): Observable<Tipper[]> {
    console.log("works")
    return this.http.get<Tipper[]>(this.tipperURL + "/topthree/" + liga.id)
  }

  getTopThreeTeams(liga: Liga): Observable<Tipper[]> {
    console.log("works")
    return this.http.get<Tipper[]>(this.tipperURL + "/topthreeteams/" + liga.id)
  }

  getTippsByUser(userID: string): Observable<TippContainer[]> {
    return this.http.post<TippContainer[]>(this.tippURL + "/owner", userID);
  }

  getAllTips(): Observable<Tipp[]> {
    return this.http.post<Tipp[]>(this.tippURL + "/all", null);
  }

  getAllTipper(): Observable<Tipper[]> {
    return this.http.post<Tipper[]>(this.tipperURL + "/all", null);
  }

  getAllTipperByRunde(rundenID: number): Observable<Tipper[]> {
    return this.http.post<Tipper[]>(this.tipperURL + "/all/tipprunden", rundenID)
  }

  getTipperByID(tipperID: number): Observable<Tipper> {
    return this.http.post<Tipper>(this.tipperURL + "/id", tipperID);
  }

  getTipperByNickname(tipper: String): Observable<Tipper[]> {
    return this.http.post<Tipper[]>(this.tipperURL + "/name", tipper);
  }

  sendTipp(tipp: TippContainer, userMail: string): void {
    this.tippMail.tipp = tipp.tipp;
    this.tippMail.team1Name = tipp.team1
    this.tippMail.team2Name = tipp.team2
    this.tippMail.userMail = userMail;
    this.tippMail.senderName = sessionStorage.getItem("name") + ""

    this.sendMail().subscribe(data => this.tippMail = data)
  }

  sendMail(): Observable<TippMail> {
    return this.http.post<TippMail>(this.tippURL + "/mail", this.tippMail);
  }

  giveTippPoints(){
    let date = sessionStorage.getItem('datum')
    let splitstr = date?.split(".")
    this.http.get(this.tippURL + "/givePoints/"+ splitstr).subscribe(result => this.worked(), this.didntwork)
  }

  checkIfTipperInRunde(rundeid: bigint, userid: bigint): Observable<boolean>{
    return this.http.get<boolean>(this.tipperURL+"/isInRunde/"+rundeid+"/"+userid)
  }

  worked(){
    console.log("worked")
  }
  didntwork(){
    console.log("didnt Work")
  }
}
