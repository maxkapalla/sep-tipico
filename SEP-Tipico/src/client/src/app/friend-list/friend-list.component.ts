import {Component, OnInit} from '@angular/core';
import {Nutzer} from "../Models/Nutzer";
import {NutzerService} from "../services/nutzer.service";
import {TippService} from "../services/tipp.service";
import {TippContainer} from "../Models/TippContainer";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  nutzers: Nutzer[];
  id: number;
  openRequests: Nutzer[];
  friendDeleted: boolean;
  friendAccepted: boolean;
  tipps: TippContainer[];

  constructor(private service: NutzerService, private tippService: TippService) {
    this.nutzers = [];
    this.id = 0;
    this.openRequests = [], this.friendDeleted = false, this.friendAccepted = false, this.tipps = []
  }

  ngOnInit(): void {
    var preID = sessionStorage.getItem('id') + ""
    this.id = +preID;
    console.log(preID)
    this.service.getFriends(this.id).subscribe((data: any) => this.nutzers = data)
    this.showFriendRequests();
    this.tippService.getTippsByUser(sessionStorage.getItem("id") + "").subscribe((data: any) => this.tipps = data)
  }


  removeFriend(friendID: string) {
    this.service.removeFriend(sessionStorage.getItem("id") + "", friendID).subscribe((data: any) => {
      this.friendDeleted = data;
      alert("removed");
      window.location.reload()
    })

  }

  showFriendRequests() {
    this.service.getFriendRequests(sessionStorage.getItem("id")).subscribe((data: any) => this.openRequests = data)
  }

  acceptFriend(friendID: string) {
    this.service.acceptFriend(sessionStorage.getItem("id") + "", friendID).subscribe((data: any) => {
      this.friendAccepted = data;
      alert("Freundschaftsanfrage angenommen");
      window.location.reload()
    })

  }

  shareTipp(tipp: TippContainer, userMail: string | undefined) {
    this.tippService.sendTipp(tipp, userMail + "");
    alert("Tipp versendet");
  }


}
