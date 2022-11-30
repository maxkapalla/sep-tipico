import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nutzer} from "../Models/Nutzer";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class AdminAuthService {

  private adminURL:String;
  constructor(private http: HttpClient) {this.adminURL ='http://localhost:8080/admin'; }

  register(nutzer:Nutzer): Observable<Nutzer> {
    return this.http.post<Nutzer>(this.adminURL+'/signup', nutzer);
  }
}
