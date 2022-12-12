import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipprunde-join',
  templateUrl: './tipprunde-join.component.html',
  styleUrls: ['./tipprunde-join.component.scss']
})
export class TipprundeJoinComponent implements OnInit {

  name:string="";
  id:number;
  besitzer:string="";
  liga:string="";
  zugang:string="";

  tippRunde: TippRunde;
  password:string="";


  constructor(private TippRundeService:TippRundeService, private router: Router, private route:ActivatedRoute)
  {this.tippRunde= new TippRunde, this.id=0; }

  ngOnInit(): void {
    var x= sessionStorage.getItem('RundenID')+"";
    this.id= +x;
    console.log(x);
    this.TippRundeService.getTippRundeByID(this.id).subscribe((data: any) => this.tippRunde = data)

  }

}
