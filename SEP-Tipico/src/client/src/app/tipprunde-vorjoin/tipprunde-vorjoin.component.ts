import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipprunde-vorjoin',
  templateUrl: './tipprunde-vorjoin.component.html',
  styleUrls: ['./tipprunde-vorjoin.component.scss']
})
export class TipprundeVorjoinComponent implements OnInit {
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

  onSubmit(tippRunde : TippRunde) {

    this.router.navigate(['/tipprunde-vorjoin', tippRunde.id,tippRunde.password]);

  }

}
