import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NewLiga} from "../Models/NewLiga";
import {Liga} from "../Models/Liga";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class LigaService {

  private ligaURL: String;

  constructor(private http: HttpClient) {
    this.ligaURL = 'http://localhost:8080/liga'
  }

  create(liga: NewLiga): Observable<NewLiga> {

    // window.location.reload();

    return this.http.post<NewLiga>(this.ligaURL + "/save/new", liga.name);


  }

  changeName(liga: Liga): Observable<Liga> {

    return this.http.post<Liga>(this.ligaURL + "/save", liga);


  }


  flush(): Observable<any> {
    return this.http.get(this.ligaURL + "/flush");
  }

  randomCreate(): Observable<any> {
    return this.http.get(this.ligaURL + "/random")
  }

  getAll(): Observable<Liga[]> {

    return this.http.get<Liga[]>(this.ligaURL + "/all");
  }

  delete(liga: Liga): Observable<Liga> {

    return this.http.post<Liga>(this.ligaURL + "/delete", liga);

  }

}
