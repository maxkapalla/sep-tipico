import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TipprundeVorjoinComponent} from "./tipprunde-vorjoin.component";
import {AuthService} from "../services/auth.service";

const userRoutes: Routes = [
  {path: "tipprunde-vorjoin/:id", component: TipprundeVorjoinComponent, canActivate: [AuthService]},
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ]
})

export class UserRouter {

}
