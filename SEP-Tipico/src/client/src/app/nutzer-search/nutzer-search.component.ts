import {Component, OnInit} from '@angular/core';
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import {TippRundeMail} from "../Models/TippRundeMail";

@Component({
  selector: 'app-nutzer-search',
  templateUrl: './nutzer-search.component.html',
  styleUrls: ['./nutzer-search.component.scss']
})
export class NutzerSearchComponent implements OnInit {

  nutzerName: string | undefined;
  nutzers: Nutzer[];
  tippRunden: TippRunde[];
  email = ""
  tippRundeMail: TippRundeMail | undefined;
  hasRelations: boolean;

  constructor(private service: NutzerService, private tippRundeService: TippRundeService) {
    this.nutzers = []
    this.tippRunden = []
    this.hasRelations = false;

  }


  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') + "";
    this.tippRundeService.getTippRundenByOwner(sessionStorage.getItem("id") + "").subscribe((data: any) => this.tippRunden = data);
  }

  onSubmit() {
    var firsName = ""
    var lastName = ""
    if (this.nutzerName != null) {
      if (this.nutzerName.includes(" ")) {
        var splitStr = this.nutzerName.split(' ')
        firsName = splitStr[0]
        lastName = splitStr[1]
        this.service.searchUser(firsName, lastName).subscribe((data: any) => this.nutzers = data)
      } else {
        firsName = this.nutzerName
        this.service.searchUserByOneNameOnly(firsName).subscribe((data: any) => this.nutzers = data)
      }
    }
  }

  async addFriend(nutzerID: string | undefined) {
    let sucherID = sessionStorage.getItem("id");
    if (await (this.getRelations(nutzerID + "", sucherID + ""))) {

      alert("Freundschaftsanfrage versendet!")

    } else {
      alert("Von oder zu diesem Nutzer besteht bereits eine Freundschaftsanfrage oder ihr seid bereits befreundet.")
    }
  }

  async getRelations(nutzerID: string | undefined, sucherID: string): Promise<boolean> {

    return new Promise((resolve) => {
      this.service.searchFriendRelations(nutzerID + "", sucherID + "").subscribe(response => {
        this.hasRelations = response
        resolve(response)
        console.log(this.hasRelations + " " + response)
      })
      }
    );
  }


  shareTippRunde(tippRunde: TippRunde, userMail: string | undefined) {
    this.tippRundeService.sendTippRunde(tippRunde, userMail + "");
  }


}
