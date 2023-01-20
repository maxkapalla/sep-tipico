import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {WetteAntragMail} from "../Models/WetteAntragMail";



@Injectable({
  providedIn: 'root'
})
export class GeldWetteService {

  wetteAntragMail: WetteAntragMail;

  private wettURL: string;

  constructor(private http: HttpClient) {
    this.wettURL = 'http://localhost:8080/GeldWette'
    this.wetteAntragMail = new WetteAntragMail();
  }

  sendTipp(userMail: string): void {
    this.wetteAntragMail.userMail = userMail;
    this.wetteAntragMail.senderName = sessionStorage.getItem("name") + ""

    this.sendMail().subscribe(data => this.wetteAntragMail = data)
  }

  sendMail(): Observable<WetteAntragMail> {
    return this.http.post<WetteAntragMail>(this.wettURL + "/mail", this.wetteAntragMail);
  }
}
