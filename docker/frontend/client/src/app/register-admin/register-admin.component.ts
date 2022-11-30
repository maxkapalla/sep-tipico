import { Component, OnInit } from '@angular/core';
import {Nutzer} from "../Models/Nutzer";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {NutzerService} from "../services/nutzer.service";

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

  nutzer: Nutzer;

  constructor(private service: NutzerService, private router: Router,private auth:AuthService) {this.nutzer=new Nutzer()}

  ngOnInit(): void {
    this.auth.checkLogged();
  }

  onSubmit(){
    this.service.registerAdmin(this.nutzer).subscribe(result=>this.gotoLogin(),this.errorWithSubmit);

  }

  gotoLogin()
  {
    alert("Registrierung erfolgreich!")
    this.router.navigate(['login']);
  }

  errorWithSubmit(){
    alert("E-Mail-Adress bereits vergeben")
  }
}
