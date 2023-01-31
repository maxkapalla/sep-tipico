import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatumService} from "../services/datum.service";
import {TippService} from "../services/tipp.service";

@Component({
  selector: 'app-date-change',
  templateUrl: './date-change.component.html',
  styleUrls: ['./date-change.component.scss']
})
export class DateChangeComponent implements OnInit {
  newDate = "";

  constructor(private router: Router, private datumService: DatumService, private tippService: TippService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('role') == "user") { //falls user dann route zu home
      this.router.navigate(['/home'])
    }
  }

  onSubmit() {
    this.datumService.datumChange(this.newDate)
    this.tippService.giveTippPoints();
    this.tippService.giveTippMoney();
  }


}
