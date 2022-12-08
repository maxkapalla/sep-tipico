import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tipp} from "../Models/TippN";
import {Liga} from "../Models/Liga";
import {Tipper} from "../Models/Tipper";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class TippService {

  private tippURL: String;
  private tipperURL: string;

  constructor(private http: HttpClient) {
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

}
