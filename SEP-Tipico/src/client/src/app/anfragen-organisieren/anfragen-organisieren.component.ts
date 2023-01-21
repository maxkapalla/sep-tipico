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
    this.nutzerService.setGeldStatus(NutzerID, this.wettfreigabe).subscribe();
      alert("Entfernt");
      window.location.reload()
  }

  acceptUser(NutzerID: string) {
    this.wettfreigabe = "ja";
    this.nutzerService.setGeldStatus(NutzerID, this.wettfreigabe).subscribe();
      alert("Anfrage angenommen");
      window.location.reload()
  }

}
