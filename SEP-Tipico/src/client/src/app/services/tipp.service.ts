import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tipp} from "../Models/TippN";
import {Liga} from "../Models/Liga";
import {Tipper} from "../Models/Tipper";
import {TippMail} from "../Models/TippMail";
import {TippContainer} from "../Models/TippContainer";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class TippService {

  tippMail: TippMail;

  private tippURL: String;
  private tipperURL: string;

  constructor(private http: HttpClient) {
    this.tippMail = new TippMail();
    this.tippURL = 'http://localhost:8080/tippn'
    this.tipperURL = 'http://localhost:8080/tipper'
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
  getTipperByTippRunde(tippRunde:TippRunde):Observable<TippRunde[]> {
    return this.http.post<TippRunde[]>(this.tipperURL+ "/tipp-runde",tippRunde);
  }

  getAllTips(): Observable<Tipp[]> {
    return this.http.post<Tipp[]>(this.tippURL + "/all", null);
  }

  getAllTipper(): Observable<Tipper[]> {
    return this.http.post<Tipper[]>(this.tipperURL + "/all", null);
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

}
