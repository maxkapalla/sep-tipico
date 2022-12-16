import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Willkommen auf SEP-Tipico!';
  loggedIn = sessionStorage.getItem('isLoggedIn')
  role = sessionStorage.getItem('role')
}
