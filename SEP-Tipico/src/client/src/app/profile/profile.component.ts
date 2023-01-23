import {Component, OnInit} from '@angular/core';
import {GeldWetteService} from "../services/geld-wette.service";
import {NutzerService} from "../services/nutzer.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  datum: string | null;
  id: number=0;
  url: string = ""
  name: string = ""
  email: string = ""
  birthdate: string;
  role: string = ""
  konto: string = "";
  wettfreigabe: string;
  adminemail: string|undefined;
  age: number=0;

  constructor(private geldWetteService: GeldWetteService, private nutzerService: NutzerService, private datePipe: DatePipe) {
  this.birthdate="";
  this.datum="";
  this.wettfreigabe = sessionStorage.getItem('geldWette')+"";
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
    var splitstr = this.birthdate.split('.')+"";
    this.datum = splitstr[1] + "." + splitstr[0] + "." + splitstr[2];
    this.datum=this.datePipe.transform(this.datum, 'MM.dd.yyyy')

    if(this.datum){
      var timeDiff = Math.abs(Date.now()- Date.parse(this.datum));
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    if(this.age<18) {
      alert("Sie sind mit "+ this.age+ " nicht berechtigt mit Geld zu spielen")
    }
    else {
      alert(this.age);
    }
  }

  sendMail(userMail: string | undefined) {
    this.geldWetteService.sendTipp(userMail + "");
   // this.requestBet();
    this.onClick();
   alert("Anfrage versendet. Bitte warten Sie auf die Nachricht des Admins");
  }

  onClick(): void {
    this.wettfreigabe = "Angefragt";
    this.nutzerService.setGeldStatus(sessionStorage.getItem("id") + "", this.wettfreigabe).subscribe();
    sessionStorage.setItem("geldWette", this.wettfreigabe);
  }



}
