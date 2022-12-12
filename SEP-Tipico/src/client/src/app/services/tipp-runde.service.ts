import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeMail} from "../Models/TippRundeMail";
import {Liga} from "../Models/Liga";


@Injectable({
  providedIn: 'root'
})
export class TippRundeService {

  tippRundeMail: TippRundeMail

  tippRundeURL: string

  constructor(private http: HttpClient) {this.tippRundeURL = 'http://localhost:8080/tippRunde', this.tippRundeMail = new TippRundeMail()}

  create(tippRunde: TippRunde): Observable<TippRunde> {
    console.log(tippRunde);
    return this.http.post<TippRunde>(this.tippRundeURL + "/save", tippRunde);
  }

  getAll(): Observable<TippRunde[]> {

    return this.http.get<TippRunde[]>(this.tippRundeURL + "/all");
  }

  delete(tippRunde: TippRunde): Observable<TippRunde> {

    return this.http.post<TippRunde>(this.tippRundeURL + "/delete", tippRunde);
  }

  getTippRundenByOwner(ownerID: string): Observable<TippRunde[]> {
    return this.http.post<TippRunde[]>(this.tippRundeURL + "/owner", ownerID);
  }
  getTippRundeByName(input:String): Observable<TippRunde[]> {
    return this.http.post<TippRunde[]>(this.tippRundeURL + "/name", input);
  }
  getTippRundeByBesitzer(input:String): Observable<TippRunde[]> {
    return this.http.post<TippRunde[]>(this.tippRundeURL + "/owner", input);
  }
  getTippRundeByID(input:String): Observable<TippRunde> {
    return this.http.post<TippRunde>(this.tippRundeURL + "/id", input);
  }



  sendTippRunde(tippRunde: TippRunde, userMail: string): void{
    this.tippRundeMail.tippRunde = tippRunde;
    this.tippRundeMail.userMail = userMail;
    this.tippRundeMail.senderName = sessionStorage.getItem("name") + ""

    console.log(this.tippRundeMail.tippRunde.tipprundeName + " " + this.tippRundeMail.userMail + " " + this.tippRundeMail.senderName)

    this.sendMail().subscribe(data => this.tippRundeMail = data)
  }

  sendMail(): Observable<TippRundeMail> {
    return this.http.post<TippRundeMail>(this.tippRundeURL + "/mail", this.tippRundeMail);
  }

}


