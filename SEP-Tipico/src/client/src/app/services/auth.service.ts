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
        if(route.toString().includes("RundenID")) {
          let splitLink = route.toString().split("/")
          let rundenPw = splitLink[splitLink.length-1]
          let rundenID = splitLink[splitLink.length-2]

          console.log(rundenID);

          sessionStorage.setItem("rundenPw", rundenPw)
          sessionStorage.setItem("rundenID", rundenID)
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
      this.router.navigate(['/home']);
    }
  }
}
