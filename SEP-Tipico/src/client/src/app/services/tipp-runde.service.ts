import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TippRunde} from "../Models/TippRunde";

@Injectable({
  providedIn: 'root'
})
export class TippRundeService {

  tippRundeURL: string

  constructor(private http: HttpClient) {this.tippRundeURL = 'http://localhost:8080/tippRunde'}

  getTippRundenByOwner(ownerID: string): Observable<TippRunde[]> {
    return this.http.post<TippRunde[]>(this.tippRundeURL + "/owner", ownerID);
  }
}


