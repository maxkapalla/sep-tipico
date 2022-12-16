import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import {TippService} from "../services/tipp.service";
import {Tipper} from "../Models/Tipper";

@Component({
  selector: 'app-tipprunde-join',
  templateUrl: './tipprunde-join.component.html',
  styleUrls: ['./tipprunde-join.component.scss']
})
export class TipprundeJoinComponent implements OnInit {


  id: number;
  password: string = "";
  tippRunde: TippRunde;
  tipper: Tipper;

  constructor(private TippRundeService: TippRundeService, private TippService: TippService, private router: Router) {
    this.tippRunde = new TippRunde, this.tipper = new Tipper(), this.id = 0;
    this.password = "";
  }

  ngOnInit(): void {
    var x = sessionStorage.getItem('rundenID') + "";
    this.id = +x;
    console.log(x);
    this.TippRundeService.getTippRundeByID(this.id).subscribe((data: any) => this.tippRunde = data)


    setTimeout(() => {
      console.log(this.tippRunde.password + " " + sessionStorage.getItem("rundenPw"))
      if (this.tippRunde.password == null || this.tippRunde.password == sessionStorage.getItem("rundenPw")) {
        console.log("ich bin hier")
        this.router.navigate(['/tipprunde-drinne', this.tippRunde.id])
      } else {
        this.router.navigate(['/tipp-runde'])
      }
    }, 1000)
  }

  onSubmit() {
    this.TippService.saveTipper(this.tipper).subscribe(result => this.goToRound())
  }

  goToRound() {
    this.router.navigate(['/tipprunde-drinne', this.tippRunde.id])
  }

}
