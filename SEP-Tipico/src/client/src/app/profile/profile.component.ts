import {Component, OnInit} from '@angular/core';
import {GeldWetteService} from "../services/geld-wette.service";
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  datum: string | null;
  id: string="";
  url: string = ""
  name: string = ""
  email: string = ""
  birthdate: string;
  role: string = ""
  konto: string = "";
  wettfreigabe: string;
  adminemail: string|undefined;
  age: number=0;
  nutzer: Nutzer
  nutzers: Nutzer[];

  constructor(private geldWetteService: GeldWetteService, private nutzerService: NutzerService) {
  this.birthdate="";
  this.datum="";
  this.wettfreigabe = sessionStorage.getItem('geldWette')+"";
  this.nutzer=new Nutzer();
  this.nutzers=[];
  }

  ngOnInit(): void {

    this.id= sessionStorage.getItem('id')+"";
    this.url = sessionStorage.getItem('picURL') + ""
    this.name = sessionStorage.getItem('name') + ""
    this.email = sessionStorage.getItem('email') + ""
    this.birthdate = sessionStorage.getItem('birthday') + ""
    this.role = (sessionStorage.getItem('role') + "").toUpperCase()
    this.konto = sessionStorage.getItem('kontostand') + "";
    this.wettfreigabe = sessionStorage.getItem('geldWette') +""


    this.nutzerService.getAllNutzer().subscribe((data:any) => {
      this.nutzers=data;

      for(let nutzer of this.nutzers) {
        if(this.id==nutzer.id) {
          sessionStorage.setItem('kontostand', String(nutzer.kontostand));
          console.log(this.id+"=="+nutzer.id)
        }
      }
      ;})
  }


  requestBet(userMail: string | undefined) {
    console.log(this.birthdate)
    var splitstr = this.birthdate.split('.')+"";
    this.datum = splitstr[3] + splitstr[4]+ "." + splitstr[0] +splitstr[1]+ "." + splitstr[6]+splitstr[7]+splitstr[8]+splitstr[9];
    console.log(this.datum)
    //this.datum=this.datePipe.transform(this.datum, 'MM.dd.yyyy')

    if(this.datum){
      var timeDiff = Math.abs(Date.now()- Date.parse(this.datum));
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    if(this.age<18) {
      alert("Sie sind mit "+ this.age+ " nicht berechtigt mit Geld zu spielen")
    }
    else {
      console.log(this.age);
      this.geldWetteService.sendTipp(userMail + "");
      this.onClick();
      alert("Anfrage versendet. Bitte warten Sie auf die Nachricht des Admins");
    }
  }


  onClick(): void {
    this.wettfreigabe = "Angefragt";
    this.nutzerService.setGeldStatus(sessionStorage.getItem("id") + "", this.wettfreigabe).subscribe();
    sessionStorage.setItem("geldWette", this.wettfreigabe);
  }



}
