import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-willkommen-bar',
  templateUrl: './willkommen-bar.component.html',
  styleUrls: ['./willkommen-bar.component.scss']
})
export class WillkommenBarComponent implements OnInit {
  title = 'Willkommen auf SEP-Tipico!';
  constructor() { }

  ngOnInit(): void {
  }

}
