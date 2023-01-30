import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Nutzer} from "../Models/Nutzer";
import {NutzerService} from "../services/nutzer.service";


@Component({
  selector: 'app-anfragen-organisieren',
  templateUrl: './anfragen-organisieren.component.html',
  styleUrls: ['./anfragen-organisieren.component.scss']
})
export class AnfragenOrganisierenComponent implements OnInit {

  wettfreigabe: string;
  nutzers:Nutzer[];
  nachricht: string="";

  constructor(private router: Router, private nutzerService:NutzerService) {
    this.wettfreigabe="";
    this.nutzers=[];
  }

  ngOnInit(): Nutzer[] {
    this.nutzerService.getNutzersByWettstatus("Angefragt").subscribe((data:any) => this.nutzers=data);
    return this.nutzers;
  }

  removeUser(NutzerID: string) {
    this.wettfreigabe = "Nicht angefragt";
    this.nachricht= "Wettanfrage abgelehnt!";
    this.nutzerService.setGeldStatus(NutzerID, this.wettfreigabe).subscribe();
    this.nutzerService.setMessage(NutzerID,this.nachricht)
      alert("Entfernt");
      window.location.reload()
  }

  acceptUser(NutzerID: string) {
    this.wettfreigabe = "ja";
    this.nachricht= "Wetten freigeschaltet";
    //this.nutzerService.setGeldStatus(NutzerID, this.wettfreigabe).subscribe();
    this.nutzerService.setMessage(NutzerID,this.nachricht)
      alert("Anfrage angenommen");
      //window.location.reload()

  }

}
