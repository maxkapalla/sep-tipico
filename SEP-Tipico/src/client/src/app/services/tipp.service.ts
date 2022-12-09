import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tipp} from "../Models/TippN";
import {Liga} from "../Models/Liga";
import {Tipper} from "../Models/Tipper";
import {TippRunde} from "../Models/TippRunde";
import {TippMail} from "../Models/TippMail";
import {TippRundeMail} from "../Models/TippRundeMail";


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
    this.tipperURL= 'http://localhost:8080/tipper'
  }

  save(tipp: Tipp): Observable<Tipp> {

    // window.location.reload();

    return this.http.post<Tipp>(this.tippURL + "/save", tipp);

  }

  getTopThree(liga: Liga): Observable<Tipper[]>{
    console.log("works")
    return this.http.get<Tipper[]>(this.tipperURL+"/topthree/" + liga.id)
  }

  getTippsByUser(userID: string): Observable<Tipp[]> {
    return this.http.post<Tipp[]>(this.tippURL + "/owner", userID);
  }

  sendTipp(tipp: Tipp, userMail: string): void {
    this.tippMail.tipp = tipp;
    this.tippMail.userMail = userMail;
    this.tippMail.senderName = sessionStorage.getItem("name") + ""

    this.sendMail().subscribe(data => this.tippMail = data)
  }

  sendMail(): Observable<TippMail> {
    return this.http.post<TippMail>(this.tippURL + "/mail", this.tippMail);
  }

}
