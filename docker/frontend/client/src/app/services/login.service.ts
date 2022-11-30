import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Nutzer} from "../Models/Nutzer";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  NutzerURL: string;
  constructor(private http: HttpClient) { this.NutzerURL = 'http://localhost:8080/user/'}


  public login(email:String, password:String): Observable<Nutzer>{
    return this.http.get<Nutzer>(`${this.NutzerURL}/signin/${email}/${password}`)
  }

  generateCode() {
    let code = Math.floor(100000 + Math.random() * 900000);
    let codeString = code.toString();
    sessionStorage.setItem("authCode", codeString);
  }
}
