import { Component, OnInit } from '@angular/core';
import {Nutzer} from "../Models/Nutzer";
import {Router} from "@angular/router";
import {TwoFaServiceService} from "../services/two-fa-service.service";
import {AuthService} from "../services/auth.service";
import {NutzerService} from "../services/nutzer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  nutzer: Nutzer;

  email:string ="";
  password:string ="";
  constructor(private twofa: TwoFaServiceService, private service:NutzerService, private auth:AuthService, private router: Router) { this.nutzer = new Nutzer();}

  ngOnInit(): void {
    this.auth.checkLogged();
    if(sessionStorage.getItem('datum')==null){
      sessionStorage.setItem('datum', '09.12.2020')
    }
  }

  onSubmit() {
    //console.log(this.email)
    this.service.login(this.email, this.password).subscribe(data => this.nutzer = data);
    setTimeout(() =>
      {
        try{
          if (this.nutzer.firstName !== null) {
            this.twofa.sendMail(this.email)
            sessionStorage.setItem('email', this.nutzer.email + "")
            sessionStorage.setItem('name', this.nutzer.firstName + " " + this.nutzer.lastName)
            if(this.nutzer.role == 'user') {
              sessionStorage.setItem('picURL', this.nutzer.imageURL + "")
              sessionStorage.setItem('birthday', this.nutzer.dateOfBirth + "")
            }
            sessionStorage.setItem('role', this.nutzer.role + "")

            this.gotoLogin()
          }
        }catch(e){
          this.errorWithSubmit()
        }

      },
      2000);
  }

  gotoLogin()
  {
    this.router.navigate(['two-fa']);
  }

  errorWithSubmit(){
    alert("Falsche Anmeldedaten!")
    window.location.reload();
  }
}
