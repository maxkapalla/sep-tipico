import {Component, OnInit} from '@angular/core';
import {NutzerService} from "../services/nutzer.service";

@Component({
  selector: 'app-minigame',
  templateUrl: './minigame.component.html',
  styleUrls: ['./minigame.component.scss']
})
export class MinigameComponent implements OnInit {


  kontostand: bigint;
  visible = false;
  root: any;

  private timeout: any;

  constructor(private nutzerService: NutzerService) {
    this.kontostand = BigInt(sessionStorage.getItem("kontostand") + "");
    this.root = document.querySelector(':root');


  }

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation() {
    this.visible = false;
    this.timeout = setTimeout(() => {
      let size = Math.random() * (200 - 20) + 20;
      let pos_top = Math.random() * (100);
      let pos_left = Math.random() * (100);
      this.root.style.setProperty('--football-size', size + 'px')
      this.root.style.setProperty('--pos-top', pos_top + '%')
      this.root.style.setProperty('--pos-left', pos_left + '%')
      this.makeVisible()
      setTimeout(() => {
        this.makeInvisible()
        this.initAnimation()
      }, 5000)
    }, 5000)

  }

  makeVisible() {
    this.visible = true;
  }

  makeInvisible() {
    this.visible = false;
  }

  onClick(): void {
    this.kontostand = this.kontostand + BigInt("100");
    this.nutzerService.setKontostand(sessionStorage.getItem("id") + "", String(this.kontostand)).subscribe();
    sessionStorage.setItem("kontostand", String(this.kontostand));
    this.visible = false;
    clearTimeout(this.timeout)
    this.initAnimation();
  }

}
