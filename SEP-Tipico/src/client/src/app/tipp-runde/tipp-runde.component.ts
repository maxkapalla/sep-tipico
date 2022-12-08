import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";

@Component({
  selector: 'app-tipp-runde',
  templateUrl: './tipp-runde.component.html',
  styleUrls: ['./tipp-runde.component.scss']
})
export class TippRundeComponent implements OnInit {

  tippRunden: TippRunde[];

  constructor(private route:ActivatedRoute, private TippRundeService:TippRundeService, private router: Router) {
    this.tippRunden =[];
  }

  ngOnInit(): TippRunde[] {
    this.TippRundeService.getAll().subscribe((data:any) => this.tippRunden=data);
    return this.tippRunden;
  }

}