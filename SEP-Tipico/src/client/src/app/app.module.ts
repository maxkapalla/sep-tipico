import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TwoFAComponent} from './two-fa/two-fa.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {RegisterAdminComponent} from './register-admin/register-admin.component';
import {HeaderComponent} from './header/header.component';
import {DateChangeComponent} from './date-change/date-change.component';
import {SidebarAdminComponent} from './sidebar-admin/sidebar-admin.component';
import {SidebarUserComponent} from './sidebar-user/sidebar-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LigaCreateComponent} from './liga-create/liga-create.component';
import {MatchPlanCreateComponent} from './matchplan-create/matchplan-create.component';
import {MatchPlanShowComponent} from './matchplan-show/matchplan-show.component';
import {TeamCreateComponent} from "./team-create/team-create.component";
import {TeamShowComponent} from "./team-show/team-show.component";
import {LoginComponent} from './login/login.component';
import {SpielplanCsvComponent} from "./spielplan-csv/spielplan-csv.component";
import {LigaSeeComponent} from "./liga-see/liga-see.component";
import {ProfileComponent} from './profile/profile.component';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {NutzerSearchComponent} from './nutzer-search/nutzer-search.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {TippAbgebenComponent} from "./tipp-abgeben/tipp-abgeben.component";
import {TippRundeComponent} from './tipp-runde/tipp-runde.component';
import {TippRundeCreateComponent} from './tipp-runde-create/tipp-runde-create.component';
import {TopthreeComponent} from './topthree/topthree.component';
import {TippHilfeService} from "./services/tipphilfe.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TwoFAComponent,
    RegisterUserComponent,
    RegisterAdminComponent,
    HeaderComponent,
    DateChangeComponent,
    SidebarAdminComponent,
    SidebarUserComponent,
    LigaCreateComponent,
    MatchPlanCreateComponent,
    MatchPlanShowComponent,
    TeamCreateComponent,
    TeamShowComponent,
    LoginComponent,
    SpielplanCsvComponent,
    LigaSeeComponent,
    ProfileComponent,
    FileUploadComponent,
    NutzerSearchComponent,
    FriendListComponent,
    TippAbgebenComponent,
    TippRundeComponent,
    TippRundeCreateComponent,
    TopthreeComponent,
    TippHilfeService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
