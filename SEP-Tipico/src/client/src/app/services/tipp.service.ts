import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tipp} from "../Models/TippN";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class TippService {

  private tippURL: String;


  constructor(private http: HttpClient) {
    this.tippURL = 'http://localhost:8080/tippn'
  }

  save(tipp: Tipp): Observable<Tipp> {

    // window.location.reload();

    return this.http.post<Tipp>(this.tippURL + "/save", tipp);

  }

}
