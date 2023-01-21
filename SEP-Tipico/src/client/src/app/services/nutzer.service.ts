import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Nutzer} from "../Models/Nutzer";
import {HttpClient} from "@angular/common/http";

const userURL = 'http://localhost:8080/user'
const nutzerURL = 'http://localhost:8080/nutzer'
const adminURL = 'http://localhost:8080/admin';

@Injectable({
  providedIn: 'root'
})
export class NutzerService {

  constructor(private http: HttpClient) {
  }

  public login(email: String, password: String): Observable<Nutzer> {
    //console.log(email)
    return this.http.get<Nutzer>(nutzerURL + "/signin/" + email + "/" + password)
  }

  public registerAdmin(nutzer: Nutzer): Observable<Nutzer> {
    return this.http.post<Nutzer>(adminURL + '/signup', nutzer);
  }

  public registerUser(nutzer: Nutzer): Observable<Nutzer> {
    return this.http.post<Nutzer>(userURL + '/signup', nutzer);
  }

  public searchUser(firstName: string, lastName: string): Observable<Nutzer[]> {
    console.log(firstName + " " + lastName)
    return this.http.get<Nutzer[]>("http://localhost:8080/nutzer/search/" + firstName + "/" + lastName)
  }

  public searchUserByOneNameOnly(name: string): Observable<Nutzer[]> {
    return this.http.get<Nutzer[]>("http://localhost:8080/nutzer/search/" + name)
  }

  public getFriends(id: number): Observable<Nutzer[]> {
    return this.http.get<Nutzer[]>("http://localhost:8080/friends/list/" + id)
  }

  public searchFriendRelations(nutzerID: string, sucherID: string): Observable<boolean> {
    return this.http.get<boolean>("http://localhost:8080/friends/search/" + nutzerID + "/" + sucherID)
  }

  public getFriendRequests(sucherID: string | null): Observable<Nutzer[]> {
    return this.http.get<Nutzer[]>("http://localhost:8080/friends/friendrequest/" + sucherID)
  }

  public removeFriend(nutzerID: string, sucherID: string): Observable<boolean> {
    return this.http.get<boolean>("http://localhost:8080/friends/remove/" + nutzerID + "/" + sucherID)
  }

  public acceptFriend(nutzerID: string, sucherID: string): Observable<boolean> {
    return this.http.get<boolean>("http://localhost:8080/friends/accept/" + nutzerID + "/" + sucherID)
  }


  public sendFriendRequest(nutzerID: string, sucherID: string): Observable<boolean> {
    return this.http.get<boolean>("http://localhost:8080/friends/add/" + nutzerID + "/" + sucherID)
  }

  public getNutzersByIds(nutzerid1: bigint, nutzerid2: bigint, nutzerid3: bigint): Observable<Nutzer[]> {
    return this.http.get<Nutzer[]>('http://localhost:8080/nutzer/' + nutzerid1 + '/' + nutzerid2 + '/' + nutzerid3)
  }

  public getAllNutzer(): Observable<Nutzer[]> {
    return this.http.get<Nutzer[]>('http://localhost:8080/nutzer/alle')
  }

  public getNutzerByID(id: String): Observable<any> {
    return this.http.get<Observable<any>>('http://localhost:8080/nutzer/'+id)
  }

  public getKontostand(): Observable<bigint> {
    return this.http.get<bigint>('http://localhost:8080/nutzer/kontostand')
  }

  public setKontostand(id: String, kontostand: String): Observable<any> {
    console.log(id, kontostand)
    return this.http.post<Observable<any>>(`http://localhost:8080/nutzer/kontostand?id=${id}`, kontostand);
  }
  public setGeldStatus(id: String, status: String): Observable<any> {
    console.log(id, status)
    return this.http.post<Observable<any>>(`http://localhost:8080/nutzer/geldStatus?id=${id}`, status);
  }

}
