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
import {NutzerSearchComponent} from "./nutzer-search/nutzer-search.component";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {TippAbgebenComponent} from "./tipp-abgeben/tipp-abgeben.component";
import {TippRundeComponent} from "./tipp-runde/tipp-runde.component";
import {TippRundeCreateComponent} from "./tipp-runde-create/tipp-runde-create.component";
import {TopthreeComponent} from "./topthree/topthree.component";
import {TippHilfeComponent} from "./tipphilfe/tipphilfe.component";
import {TipprundeJoinComponent} from "./tipprunde-join/tipprunde-join.component";
import {TipprundeVorjoinComponent} from "./tipprunde-vorjoin/tipprunde-vorjoin.component";
import {TipprundeDrinneComponent} from "./tipprunde-drinne/tipprunde-drinne.component";
import {TipperProfileComponent} from "./tipper-profile/tipper-profile.component";
import {TopthreeTeamComponent} from "./topthree-teams/topthree-team.component";
import {MinigameComponent} from "./minigame/minigame.component";
import {LigaTableComponent} from "./liga-table/liga-table.component";
import {AnfragenOrganisierenComponent} from "./anfragen-organisieren/anfragen-organisieren.component";
import {AdminStatsComponent} from "./admin-stats/admin-stats.component";
import {UserStatsComponent} from "./user-stats/user-stats.component";
import {ChatComponent} from "./chat/chat.component";
import {ChatRequestsComponent} from "./chat-requests/chat-requests.component";
import {GeldWetteAbgebenComponent} from "./geld-wette-abgeben/geld-wette-abgeben.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'admin', component: RegisterAdminComponent},
  {path: 'user', component: RegisterUserComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService]},
  {path: 'date-change', component: DateChangeComponent, canActivate: [AuthService]},
  {path: 'two-fa', component: TwoFAComponent},
  {path: 'liga-create', component: LigaCreateComponent, canActivate: [AuthService]},
  {path: 'matchplan-create', component: MatchPlanCreateComponent, canActivate: [AuthService]},
  {path: 'matchplan-show', component: MatchPlanShowComponent, canActivate: [AuthService]},
  {path: 'team-show', component: TeamShowComponent, canActivate: [AuthService]},
  {path: 'team-create', component: TeamCreateComponent, canActivate: [AuthService]},
  {path: 'login', component: LoginComponent},
  {path: 'csv', component: SpielplanCsvComponent, canActivate: [AuthService]},
  {path: 'liga-see', component: LigaSeeComponent, canActivate: [AuthService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthService]},
  {path: 'fileupload', component: FileUploadComponent, canActivate: [AuthService]},
  {path: 'search', component: NutzerSearchComponent, canActivate: [AuthService]},
  {path: 'friends', component: FriendListComponent, canActivate: [AuthService]},
  {path: 'tipp-abgeben', component: TippAbgebenComponent, canActivate: [AuthService]},
  {path: 'tipp-runde', component: TippRundeComponent, canActivate: [AuthService]},
  {path: 'tipp-runde-create', component: TippRundeCreateComponent, canActivate: [AuthService]},
  {path: 'top-three', component: TopthreeComponent, canActivate: [AuthService]},
  {path: 'top-three-team', component: TopthreeTeamComponent, canActivate: [AuthService]},
  {path: "tipphilfe", component: TippHilfeComponent, canActivate: [AuthService]},
  {path: "tipprunde-join/:id", component: TipprundeJoinComponent, canActivate: [AuthService]},
  {path: "tipprunde-join/:id/:password", component: TipprundeJoinComponent, canActivate: [AuthService]},
  {path: "tipprunde-vorjoin/:id", component: TipprundeVorjoinComponent, canActivate: [AuthService]},
  {path: "tipprunde-drinne/:id", component: TipprundeDrinneComponent, canActivate: [AuthService]},
  {path: "tipprunde-drinne/:id/:password", component: TipprundeDrinneComponent, canActivate: [AuthService]},
  {path: 'tippRunde/RundenID/:id/:password', component: TippRundeComponent, canActivate: [AuthService]},
  {path: 'tipper-profile/:id', component: TipperProfileComponent, canActivate: [AuthService]},
  {path: 'minigame', component: MinigameComponent, canActivate: [AuthService]},
  {path: 'liga-table', component: LigaTableComponent, canActivate: [AuthService]},
  {path: 'anfragen-organisieren', component: AnfragenOrganisierenComponent, canActivate: [AuthService]},
  {path: 'admin-stats', component: AdminStatsComponent, canActivate: [AuthService]},
  {path: 'user-stats', component: UserStatsComponent, canActivate: [AuthService]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthService]},
  {path: 'chat-requests', component: ChatRequestsComponent, canActivate: [AuthService]},
  {path: 'geld-wette-abgeben', component: GeldWetteAbgebenComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
