import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatumService {
  datum =""
  constructor() { }

  datumChange(newDate: string){
    sessionStorage.removeItem('datum');
    sessionStorage.setItem('datum', newDate);
    window.location.reload();
  }



}
