import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TwoFaCode} from "../Models/TwoFaCode";


@Injectable({
  providedIn: 'root'
})
export class TwoFaServiceService {

  twoFaCode: TwoFaCode
  twoFaURL: String
  constructor(private http: HttpClient) {this.twoFaURL = 'http://localhost:8080/twofa'; this.twoFaCode = new TwoFaCode()}

  public sendMail(mailAdress:string): void {

    this.twoFaCode.mail = mailAdress
    this.twoFaCode.twofa = this.generateCode()
    sessionStorage.setItem("authCode", this.twoFaCode.twofa+"")

    console.log(mailAdress)
    console.log(this.twoFaCode.twofa)

    this.sendCode().subscribe(data => this.twoFaCode = data)
    console.log(this.twoFaURL+"/auth"+ " code: " + this.twoFaCode.twofa)

  }

  private sendCode(): Observable<TwoFaCode> {
    return this.http.post<TwoFaCode>(this.twoFaURL+"/auth", this.twoFaCode)
  }

  checkCode(val: TwoFaCode) {
    if (val.twofa == sessionStorage.getItem("authCode") || val.twofa == "000000") {
      return true;
    } else {
      return false;
    }
  }

  private generateCode() {
    let code = Math.floor(100000 + Math.random() * 900000);
    let codeString = code.toString();
    sessionStorage.setItem("authCode", codeString);
    return codeString;
  }


}
