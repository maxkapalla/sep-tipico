import { Component, OnInit } from '@angular/core';
import {TippRunde} from "../Models/TippRunde";
import {ActivatedRoute, Router} from "@angular/router";
import {TippRundeService} from "../services/tipp-runde.service";
import {TippService} from "../services/tipp.service";
import {Tipper} from "../Models/Tipper";


@Component({
  selector: 'app-tipprunde-drinne',
  templateUrl: './tipprunde-drinne.component.html',
  styleUrls: ['./tipprunde-drinne.component.scss']
})
export class TipprundeDrinneComponent implements OnInit {
  id:number;

  tippende:Tipper[];
  tippRunde: TippRunde;
  password:string="";

  constructor(private TippRundeService:TippRundeService,private TippService:TippService ,private router: Router, private route:ActivatedRoute)
  {this.tippRunde= new TippRunde, this.id=0; this.tippende=[]; }

  ngOnInit(): Tipper[] {
    var x = sessionStorage.getItem('rundenID') + "";
    this.id = +x;
    console.log(x);
   this.TippRundeService.getTippRundeByID(this.id).subscribe((data: any) => this.tippRunde = data)
    this.TippService.getAllTipperByRunde(this.id).subscribe((data:any) => this.tippende=data);
   return this.tippende;
  }

}
