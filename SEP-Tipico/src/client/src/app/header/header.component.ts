import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = sessionStorage.getItem('isLoggedIn')
  nutzer: string = ""
  datum: string = ""

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.nutzer = sessionStorage.getItem('name') + ""
      this.datum = sessionStorage.getItem('datum') + ""
    }, 10);
  }

}
