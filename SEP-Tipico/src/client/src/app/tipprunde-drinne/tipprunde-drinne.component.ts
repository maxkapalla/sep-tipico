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
  tipper:Tipper;
  tippRunde: TippRunde;
  password:string="";

  constructor(private TippRundeService:TippRundeService,private TippService:TippService ,private router: Router, private route:ActivatedRoute)
  {this.tippRunde= new TippRunde, this.id=0; this.tippende=[];this.tipper=new Tipper() }

  ngOnInit(): Tipper[] {
    this.checkPW()
    var x = sessionStorage.getItem('rundenID') + "";
    this.id = +x;
    console.log(x);
   this.TippRundeService.getTippRundeByID(this.id).subscribe((data: any) => this.tippRunde = data)
    console.log(this.tippRunde.id)
    this.TippService.getAllTipperByRunde(this.id).subscribe((data:any) => this.tippende=data);
   return this.tippende;
  }
  onSubmit() {
    this.TippService.saveTipper(this.tipper).subscribe(result => this.goToRound(),this.errorHand)
  }
  goToRound() {
    this.router.navigate(['/tipprunde-drinne',this.tippRunde.id,this.tippRunde.password])
  }
  errorHand() {
    alert("a")
  }

  async checkPW() {
    var z = sessionStorage.getItem("rundenID")+""
    let y:number = +z
    console.log("y: " + y)
    await this.TippRundeService.getTippRundeByID(y).subscribe(response => {
      this.tippRunde = response
      if(!(this.tippRunde.password == sessionStorage.getItem("rundenPw"))) {
        this.router.navigate(['/home'])
      }
      sessionStorage.removeItem("rundenID")
      sessionStorage.removeItem("rundenPw")
    })
  }
}
