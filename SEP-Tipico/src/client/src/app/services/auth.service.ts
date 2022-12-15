import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  constructor( private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return new Promise((resolve, reject)=> {

      if(!sessionStorage.getItem('isLoggedIn')){
        if(route.toString().includes("tipprunde-drinne")) {
          let rundenPw = route.paramMap.get('password')
          let rundenID = route.paramMap.get('id')

          console.log(rundenID);

          sessionStorage.setItem("rundenPw", rundenPw+"")
          sessionStorage.setItem("rundenID", rundenID+"")
        }
        this.router.navigate(['/login']);
        return resolve(false);
      }else{
        return resolve(true);
      }
    });
  }

  public checkLogged(){
    if(sessionStorage.getItem('isLoggedIn')){
      if(sessionStorage.getItem('rundenID') != null) {
        this.router.navigate(['/tipprunde-drinne', sessionStorage.getItem("rundenID"), sessionStorage.getItem("rundenPw")]);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }
}
