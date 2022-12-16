import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";

@Component({
  selector: 'app-tipprunde-vorjoin',
  templateUrl: './tipprunde-vorjoin.component.html',
  styleUrls: ['./tipprunde-vorjoin.component.scss']
})
export class TipprundeVorjoinComponent implements OnInit {

  id: number;


  tippRunde: TippRunde;
  password: string = "";

  constructor(private TippRundeService: TippRundeService, private router: Router) {
    this.tippRunde = new TippRunde, this.id = 0;
  }

  ngOnInit(): void {
    var x = sessionStorage.getItem('rundenID') + "";
    this.id = +x;
    console.log(x);
    this.TippRundeService.getTippRundeByID(this.id).subscribe((data: any) => this.tippRunde = data)

    setTimeout(() => {
      if (this.tippRunde.password == null) {
        this.router.navigate(['/tipprunde-drinne', this.tippRunde.id]);
      }
    }, 100)
  }

  onSubmit(tippRunde: string) {

    if (tippRunde == this.tippRunde.password) {
      sessionStorage.setItem('rundenPw', this.tippRunde.password + "");
      this.router.navigate(['/tipprunde-drinne', this.tippRunde.id, this.tippRunde.password]);
    } else {
      alert("Falsches Password");
    }

  }

}
