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

  private tippURL: string;
  private tipperURL: string;
  private matchURl: string;
  private rundenURL: string;
  constructor(private http: HttpClient) {
    this.tippMail = new TippMail();
    this.tippURL = 'http://localhost:8080/tippn'
    this.tipperURL = 'http://localhost:8080/tipper'
    this.matchURl = 'http://localhost:8080/spiel'
    this.rundenURL = 'http://localhost:8080/tippRunde'
    this.tipps = [];
    this.tippers= [];
    this.matches = [];
    this.tippRunden= [];
  }

  save(tipp: Tipp): Observable<Tipp> {

    // window.location.reload();

    return this.http.post<Tipp>(this.tippURL + "/save", tipp);

  }
  saveTipper(nickname:Tipper): Observable<Tipper> {
    console.log(nickname)
    return this.http.post<Tipper>(this.tipperURL+"/save",nickname);
  }

  getTopThree(liga: Liga): Observable<Tipper[]> {
    console.log("works")
    return this.http.get<Tipper[]>(this.tipperURL + "/topthree/" + liga.id)
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
  getAllTipperByRunde(rundenID:number): Observable<Tipper[]> {
    return this.http.post<Tipper[]>(this.tipperURL+ "/all/tipprunden", rundenID )
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
    this.http.get<Tipp[]>(this.tippURL+"/all").subscribe((data: any) => this.tipps= data)
    this.http.get<Tipper[]>(this.tipperURL+"/all").subscribe((data: any) => this.tippers= data)
    this.http.get<Match[]>(this.matchURl+"/all").subscribe((data: any) => this.matches = data)
    this.http.get<TippRunde[]>(this.rundenURL+"/all").subscribe((data:any) => this.tippRunden = data)
    let date = sessionStorage.getItem('datum')
    let points = 0;
    let tipperWPoints: Tipper[]
    setTimeout(()=> {
      for(let tipp of this.tipps){
        for(let match of this.matches){
          if(tipp.spiel == match.id && this.checkDate(match.date, date+"")){
            let bewertungen = this.getBewertungen(tipp)
            if(tipp.tippA == match.scoreTeamA && tipp.tippB == match.scoreTeamB){
              points += bewertungen[0]
            }
            if((tipp.tippA>tipp.tippB && match.scoreTeamA>match.scoreTeamB) || (tipp.tippA<tipp.tippB && match.scoreTeamA<match.scoreTeamB)){
              points += bewertungen[1]
            }
            if((tipp.tippA - tipp.tippB) == (match.scoreTeamA - match.scoreTeamB)){
              points += bewertungen[2]
            }
            break;
          }
        }
        if(points != 0){
          for(let tipper of this.tippers){
            if(tipp.tipperID == tipper.id){
              tipper.points = points;
              tipperWPoints.push(tipper)
            }
          }
        }
      }
      this.http.put<Tipper[]>(this.tipperURL+"/givePoints", tipperWPoints).subscribe(result => this.worked,this.didntwork)
    },1000)
  }

  worked(){
    console.log("worked")
  }
  didntwork(){
    console.log("didnt Work")
  }

  getBewertungen(tipp: Tipp): number[]{
    let bewertungen: number[] = [0,0,0]
    for(let runde of this.tippRunden){
      if(tipp.tipprundenid == runde.id){
        bewertungen[0] = +(runde.gewTore+"")
        bewertungen[1] = +(runde.gewGewinner+"")
        bewertungen[2] = +(runde.gewDiff+"")
      }
    }
    return bewertungen
  }

  checkDate(date1: string, date2: string): boolean{
    date1 = date1.slice(0,10)
    let splitstr1 = date1.split('-')
    let splitstr2 = date2.split('.')
    if(+splitstr1[0] <= +splitstr2[2]){
      if(+splitstr1[1] <= +splitstr2[1]){
        if(+splitstr1[2] <= +splitstr2[0]){
          return true;
        }
      }
    }
    return false;
  }
}
