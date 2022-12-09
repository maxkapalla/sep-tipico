import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TippHilfeService {

  tippHilfeURL: string;

  constructor(private http: HttpClient) {
    this.tippHilfeURL = 'http://localhost:8080/tipphilfe'
  }


}
