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

  constructor(private tippservice: TippService, private nutzerService: NutzerService) {

  }

  ngOnInit(): void {
    this.tippservice.giveTippPoints();
    this.tippservice.giveTippMoney();
  }


}
