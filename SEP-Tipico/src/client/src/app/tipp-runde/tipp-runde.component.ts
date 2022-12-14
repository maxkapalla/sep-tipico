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

  rundePassword:String ="";
  searchInput:String ="";
  searchType:String="TipprundeName";
  tippRunden: TippRunde[];

  constructor(private route:ActivatedRoute, private TippRundeService:TippRundeService, private router: Router) {
    this.tippRunden =[];
  }

  ngOnInit(): TippRunde[] {
    this.TippRundeService.getAll().subscribe((data:any) => this.tippRunden=data);
    return this.tippRunden;
  }
  submitSearch(input:String)
  {
    switch (this.searchType)
    {
      case "TipprundeName":
        this.TippRundeService.getTippRundeByName(input).subscribe(data=>{this.tippRunden=data});
        break;
      case "Besitzer":
        this.TippRundeService.getTippRundeByBesitzer(input).subscribe(data=>{this.tippRunden=data});
        break;
    }
  }

  anschauen(tippRunde : TippRunde) {
    console.log(tippRunde);
    sessionStorage.setItem('rundenID', tippRunde.id + "");

    this.router.navigate(['/tipprunde-vorjoin', tippRunde.id]);
  }

  showPasswordField(id: string, idB: string,idP: string, password: string, focusout: boolean) {
    if (password != "") {
      var x = document.getElementById(id)
      var y = document.getElementById(idB)
      var z = document.getElementById(idP)
      if (x != null && y != null && z != null) {
        if (x.style.display == "none") {
          x.style.display = "inline"
          y.style.display = "none"
          if(!focusout) {
            z.focus()
          }
        } else {
          x.style.display = "none";
          y.style.display = "inline"
        }
      }
    } else if(!focusout) {
      this.gotoRunde(id,"", "");
    }
  }

  gotoRunde(tippRundeID: string, tippRundePw: string, inputPw: string) {

  }
}
