import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";

@Component({
  selector: 'app-tipprunde-vorjoin',
  templateUrl: './tipprunde-vorjoin.component.html',
  styleUrls: ['./tipprunde-vorjoin.component.scss']
})
export class TipprundeVorjoinComponent implements OnInit {

  tippRunde: TippRunde;
  password:string="";
  constructor(private TippRundeService:TippRundeService, private router: Router) {this.tippRunde= new TippRunde(); }

  ngOnInit(): void {

    this.TippRundeService.getAll().subscribe((data:any) => this.tippRunde=data);
  }
  onSubmit() {

  }

}
