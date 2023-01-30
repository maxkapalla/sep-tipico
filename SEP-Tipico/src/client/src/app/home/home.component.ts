import {Component, OnInit} from '@angular/core';
import {TippService} from "../services/tipp.service";
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nutzer: Nutzer

  constructor(private tippservice: TippService, private nutzerService: NutzerService) {
    this.nutzer= new Nutzer();
  }

  ngOnInit(): void {
    this.tippservice.giveTippPoints();
    this.tippservice.giveTippMoney();
    this.nutzerService.getNutzerByID(sessionStorage.getItem('id')+"").subscribe((data: any) => this.nutzer=data)
    if(this.nutzer.messageAnfrage==null) {

    }
    else {
        alert(this.nutzer.messageAnfrage)
    }
  }


}
