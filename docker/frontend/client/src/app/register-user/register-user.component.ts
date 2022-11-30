import { Component } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {Nutzer} from "../Models/Nutzer";
import {AuthService} from "../services/auth.service";
import {NutzerService} from "../services/nutzer.service";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  nutzer: Nutzer;
  datum: string= "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: NutzerService,
              private auth: AuthService) {this.nutzer=new Nutzer() }

  ngOnInit(){
    this.auth.checkLogged();
  }

  onSubmit(){
    var splitstr= this.datum.split('-')
    this.datum= splitstr[2]+"."+splitstr[1]+"."+splitstr[0];
    this.nutzer.dateOfBirth = this.datum;
    this.service.registerUser(this.nutzer).subscribe(result=>this.gotoLogin(),this.errorWithSubmit);
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
