import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  nutzer:string=""
  datum: string=""
  ngOnInit(): void {
    setTimeout(()=> {
      this.nutzer = sessionStorage.getItem('name') + ""
      this.datum = sessionStorage.getItem('datum') + ""
    }, 10);
  }

}
