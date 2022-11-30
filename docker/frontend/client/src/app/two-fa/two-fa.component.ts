import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TwoFaServiceService} from "../services/two-fa-service.service";
import {TwoFaCode} from "../Models/TwoFaCode";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.scss']
})
export class TwoFAComponent {


  twoFa: TwoFaCode;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private twoFaService: TwoFaServiceService,
              private auth:AuthService) {this.twoFa = new TwoFaCode()}

  twofaAuth: any;
  TwoFaCode: any;

  ngOnInit(): void {
    this.auth.checkLogged();
    if(!sessionStorage.getItem('email')){
      this.router.navigate(['/login'])
    }
  }

  onSubmit(val: string) {
    this.twofaAuth = val;

    if (this.twoFaService.checkCode(this.twoFa)) {
      // this.router.navigate(['/team-show']);
      sessionStorage.removeItem('authCode')
      sessionStorage.setItem('isLoggedIn', 'true')
      window.location.reload();
    } else {
      alert("Code ungültig!")
    }
  }

  resendMail() {
    let mail = sessionStorage.getItem('email')
    this.twoFaService.sendMail(mail+"")
    alert("Dir wurde ein neuer Code zugesendet!" + "\n" +
      "Bitte überprüfe dein Email-Postfach")
  }
}
