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
import {TippHilfeComponent} from "./tipphilfe/tipphilfe.component";
import {TipprundeJoinComponent} from './tipprunde-join/tipprunde-join.component';
import {TipprundeVorjoinComponent} from './tipprunde-vorjoin/tipprunde-vorjoin.component';
import {TipprundeDrinneComponent} from './tipprunde-drinne/tipprunde-drinne.component';
import {TipperProfileComponent} from './tipper-profile/tipper-profile.component';
import {TopthreeTeamComponent} from "./topthree-teams/topthree-team.component";
import {MinigameComponent} from "./minigame/minigame.component";
import {LigaTableComponent} from "./liga-table/liga-table.component";
import { UserStatsComponent } from './user-stats/user-stats.component';
import { AdminStatsComponent } from './admin-stats/admin-stats.component';
import { ChatComponent } from './chat/chat.component';
import { AnfragenOrganisierenComponent } from './anfragen-organisieren/anfragen-organisieren.component';
import {ClickOutsideDirective} from "./clickOutside.directive";
import { ChatRequestsComponent } from './chat-requests/chat-requests.component';
import { GeldWetteAbgebenComponent } from './geld-wette-abgeben/geld-wette-abgeben.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

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
    TopthreeTeamComponent,
    TippHilfeComponent,
    TipprundeJoinComponent,
    TipprundeVorjoinComponent,
    TipprundeDrinneComponent,
    TipperProfileComponent,
    MinigameComponent,
    LigaTableComponent,
    UserStatsComponent,
    AdminStatsComponent,
    LigaTableComponent,
    ChatComponent,
    AnfragenOrganisierenComponent,
    ClickOutsideDirective,
    ChatRequestsComponent,
    GeldWetteAbgebenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule
  ],
  exports: [
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
