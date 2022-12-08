import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class TippService {




  constructor(private http: HttpClient) {

  }

}
