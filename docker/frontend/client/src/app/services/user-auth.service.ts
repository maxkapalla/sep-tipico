import {Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Nutzer} from "../Models/Nutzer";


const userURL = 'http://localhost:8080/user/'



@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  register(nutzer:Nutzer): Observable<Nutzer> {
    return this.http.post<Nutzer>(userURL+'signup', nutzer);
  }


}
