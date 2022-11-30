import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {SEPFile} from "../Models/SEPFile";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class FileUploadService {


  private URL: String;


  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8080/file'

  }

  create(file: File): Observable<File> {

    // window.location.reload();

    return this.http.post<File>(this.URL + "/save/", file);


  }

  upload(file: SEPFile): Observable<Object> {

    return this.http.post(this.URL + "/save", file);
  }

  /*
    flush(): Observable<any> {
      return this.http.get(this.ligaURL + "/flush");
    }

    randomCreate(): Observable<any> {
      return this.http.get(this.ligaURL + "/random")
    }
  */
  getAll(): Observable<SEPFile[]> {

    return this.http.get<SEPFile[]>(this.URL + "/all");
  }

  getOne(file: File): Observable<File> {

    return this.http.post<File>(this.URL + "/all", file);
  }

  delete(file: File): Observable<File> {

    return this.http.post<File>(this.URL + "/delete", file);

  }

}
