import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Nutzer} from "../Models/Nutzer";
import {HttpClient} from "@angular/common/http";

const userURL = 'http://localhost:8080/user'
const nutzerURL = 'http://localhost:8080/nutzer'
const adminURL ='http://localhost:8080/admin';
@Injectable({
  providedIn: 'root'
})
export class NutzerService {

  constructor(private http: HttpClient) { }

  public login(email:String, password:String): Observable<Nutzer>{
    //console.log(email)
    return this.http.get<Nutzer>(nutzerURL+"/signin/"+email+"/"+password)
  }

  public registerAdmin(nutzer:Nutzer): Observable<Nutzer> {
    return this.http.post<Nutzer>(adminURL+'/signup', nutzer);
  }

  public registerUser(nutzer:Nutzer): Observable<Nutzer> {
    return this.http.post<Nutzer>(userURL+'/signup', nutzer);
  }

  public searchUser(firstName: string, lastName: string): Observable<Nutzer[]>{
    console.log(firstName +" "+ lastName)
    return this.http.get<Nutzer[]>("http://localhost:8080/nutzer/search/"+firstName+"/"+lastName)
  }

  public getFriends(id: number): Observable<Nutzer[]>{
    return this.http.get<Nutzer[]>("http://localhost:8080/friends/list/"+id)
  }
}
