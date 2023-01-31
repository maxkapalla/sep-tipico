import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = sessionStorage.getItem('isLoggedIn')
  role = sessionStorage.getItem('role')
  nutzer: string = ""
  datum: string = ""

  isMenuOpened: boolean = false;
  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.nutzer = sessionStorage.getItem('name') + ""
      this.datum = sessionStorage.getItem('datum') + ""
    }, 10);
  }

}
