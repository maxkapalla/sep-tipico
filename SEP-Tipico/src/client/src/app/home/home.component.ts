import {Component, OnInit} from '@angular/core';
import {TippService} from "../services/tipp.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private tippservice: TippService) {
  }

  ngOnInit(): void {
    this.tippservice.giveTippPoints();
  }
}
