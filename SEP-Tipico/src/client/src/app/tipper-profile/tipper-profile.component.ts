import { Component, OnInit } from '@angular/core';
import {Tipper} from "../Models/Tipper";
import {TippService} from "../services/tipp.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tipper-profile',
  templateUrl: './tipper-profile.component.html',
  styleUrls: ['./tipper-profile.component.scss']
})
export class TipperProfileComponent implements OnInit {

  tipper:Tipper;
  id:number;
  constructor(private TippService:TippService, private router: Router) {
    this.tipper=new Tipper(),this.id=0;
  }

  ngOnInit(): void {
    var x= sessionStorage.getItem("TipperID")+"";
    this.id= +x;
    this.TippService.getTipperByID(this.id).subscribe((data: any) => this.tipper = data)
  }

}
