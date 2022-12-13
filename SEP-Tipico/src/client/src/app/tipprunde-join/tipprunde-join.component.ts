import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import { ActivatedRoute } from '@angular/router';
import {TippService} from "../services/tipp.service";
import {Nutzer} from "../Models/Nutzer";
import {Tipper} from "../Models/Tipper";

@Component({
  selector: 'app-tipprunde-join',
  templateUrl: './tipprunde-join.component.html',
  styleUrls: ['./tipprunde-join.component.scss']
})
export class TipprundeJoinComponent implements OnInit {


  id:number;
  password:string="";
  tippRunde: TippRunde;
  tipper:Tipper;

  constructor(private TippRundeService:TippRundeService, private TippService:TippService,private router: Router, private route:ActivatedRoute)
  {this.tippRunde= new TippRunde,this.tipper=new Tipper(), this.id=0; this.password=""; }

  ngOnInit(): void {
    var x= sessionStorage.getItem('RundenID')+"";
    this.id= +x;
    console.log(x);
    this.TippRundeService.getTippRundeByID(this.id).subscribe((data: any) => this.tippRunde = data)

    setTimeout( ()=> {
      if(this.tippRunde.password==null) {
        this.router.navigate(['/tipprunde-join', this.tippRunde.id])
      }
    } ,100)
  }
  onSubmit() {
    this.TippService.saveTipper(this.tipper).subscribe(result => this.goToRound(),this.errorHand)
  }
  goToRound() {
    this.router.navigate(['/tipprunde-drinne',this.tippRunde.id])
  }
  errorHand() {
    alert("a")
  }
}
