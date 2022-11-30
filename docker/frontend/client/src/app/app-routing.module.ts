import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterAdminComponent} from "./register-admin/register-admin.component";
import {HomeComponent} from "./home/home.component";
import {DateChangeComponent} from "./date-change/date-change.component";
import {RegisterUserComponent} from "./register-user/register-user.component";
import {TwoFAComponent} from "./two-fa/two-fa.component";
import {LigaCreateComponent} from "./liga-create/liga-create.component";
import {MatchPlanCreateComponent} from "./matchplan-create/matchplan-create.component";
import {MatchPlanShowComponent} from "./matchplan-show/matchplan-show.component";
import {TeamShowComponent} from "./team-show/team-show.component";
import {TeamCreateComponent} from "./team-create/team-create.component";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth.service";
import {SpielplanCsvComponent} from "./spielplan-csv/spielplan-csv.component";
import {LigaSeeComponent} from "./liga-see/liga-see.component";
import {ProfileComponent} from "./profile/profile.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'admin', component: RegisterAdminComponent},
  {path: 'user', component: RegisterUserComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService]},
  {path: 'date-change', component: DateChangeComponent, canActivate: [AuthService]},
  {path: 'two-fa', component: TwoFAComponent},
  {path: 'liga-create', component: LigaCreateComponent,canActivate:[AuthService]},
  {path: 'matchplan-create', component: MatchPlanCreateComponent,canActivate:[AuthService]},
  {path: 'matchplan-show', component: MatchPlanShowComponent,canActivate:[AuthService]},
  {path: 'team-show', component: TeamShowComponent,canActivate:[AuthService]},
  {path: 'team-create', component: TeamCreateComponent,canActivate:[AuthService]},
  {path: 'login', component:LoginComponent},
  {path: 'csv', component:SpielplanCsvComponent},
  {path: 'liga-see', component:LigaSeeComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthService]},
  {path: 'fileupload', component: FileUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
