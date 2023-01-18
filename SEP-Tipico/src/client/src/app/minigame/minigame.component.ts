import {Component, OnInit} from '@angular/core';
import {NutzerService} from "../services/nutzer.service";

@Component({
  selector: 'app-minigame',
  templateUrl: './minigame.component.html',
  styleUrls: ['./minigame.component.scss']
})
export class MinigameComponent implements OnInit {


  kontostand: bigint;


  constructor(private nutzerService: NutzerService) {
    this.kontostand = BigInt(sessionStorage.getItem("kontostand") + "");
  }

  ngOnInit(): void {

  }

  onClick(): void {
    this.kontostand = this.kontostand + BigInt("100");
    this.nutzerService.setKontostand(sessionStorage.getItem("id") + "", String(this.kontostand)).subscribe();
    sessionStorage.setItem("kontostand", String(this.kontostand));
  }

}
