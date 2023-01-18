import {Component, OnInit} from '@angular/core';
import {Nutzer} from "../Models/Nutzer";
import {Router} from "@angular/router";
import {TwoFaService} from "../services/two-fa.service";
import {AuthService} from "../services/auth.service";
import {NutzerService} from "../services/nutzer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  nutzer: Nutzer;

  email: string = "";
  password: string = "";

  constructor(private twofa: TwoFaService, private service: NutzerService, private auth: AuthService, private router: Router) {
    this.nutzer = new Nutzer();
  }

  ngOnInit(): void {
    this.auth.checkLogged();
    if (sessionStorage.getItem('datum') == null) {
      sessionStorage.setItem('datum', '09.12.2020')
    }
  }

  onSubmit() {
    this.service.login(this.email, this.password).subscribe(data => {
      this.nutzer = data;
      try {
        if (this.nutzer.firstName !== null) {
          this.twofa.sendMail(this.email)
          sessionStorage.setItem('email', this.nutzer.email + "")
          sessionStorage.setItem('name', this.nutzer.firstName + " " + this.nutzer.lastName)
          if (this.nutzer.role == 'user') {
            sessionStorage.setItem('picURL', this.nutzer.imageURL + "")
            sessionStorage.setItem('birthday', this.nutzer.dateOfBirth + "")
          }
          sessionStorage.setItem('role', this.nutzer.role + "")
          sessionStorage.setItem('id', this.nutzer.id + "")
          sessionStorage.setItem('kontostand', this.nutzer.kontostand + "")

          this.gotoTwoFa()
        }
      } catch (e) {
        this.errorWithSubmit()
      }
    });
  }

  gotoTwoFa() {
    this.router.navigate(['two-fa']);
  }

  errorWithSubmit() {
    alert("Falsche Anmeldedaten!")
    window.location.reload();
  }
}
