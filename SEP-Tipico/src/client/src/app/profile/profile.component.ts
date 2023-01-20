import {Component, OnInit} from '@angular/core';
import {GeldWetteService} from "../services/geld-wette.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  url: string = ""
  name: string = ""
  email: string = ""
  birthdate: string = ""
  role: string = ""
  konto: string = "";
  wettfreigabe: string= "";
  age: number=0;
  constructor(private geldWetteService: GeldWetteService) {

  }

  ngOnInit(): void {
    this.url = sessionStorage.getItem('picURL') + ""
    this.name = sessionStorage.getItem('name') + ""
    this.email = sessionStorage.getItem('email') + ""
    this.birthdate = sessionStorage.getItem('birthday') + ""
    this.role = (sessionStorage.getItem('role') + "").toUpperCase()
    this.konto = sessionStorage.getItem('kontostand') + "";
    this.wettfreigabe = sessionStorage.getItem('geldWette') +""
  }

  requestBet() {
    if(this.birthdate){
      var timeDiff = Math.abs(Date.now()- Date.parse(this.birthdate));
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    alert(this.age);
  }
  sendMail(userMail: string | undefined) {
  this.geldWetteService.sendTipp(userMail + "");
  alert("Anfrage versendet " + userMail);
}
}
