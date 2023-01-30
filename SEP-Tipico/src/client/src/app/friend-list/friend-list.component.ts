import {Component, OnInit} from '@angular/core';
import {Nutzer} from "../Models/Nutzer";
import {NutzerService} from "../services/nutzer.service";
import {TippService} from "../services/tipp.service";
import {TippContainer} from "../Models/TippContainer";
import {ChatService} from "../services/chat.service";

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

  constructor(private service: NutzerService, private tippService: TippService, private chatService: ChatService) {
    this.nutzers = [];
    this.id = 0;
    this.openRequests = [];
    this.friendDeleted = false;
    this.friendAccepted = false;
    this.tipps = []
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
    alert("Tipp versendet an " + userMail);
  }

  sendChatRequest(friendID: string){
    console.log("Request sent")
    let myID = sessionStorage.getItem("id")+""

    this.chatService.getMySentRequests(BigInt(myID)).subscribe(data => {

      if(sessionStorage.getItem("Chat") == null && data.length < 1){
        this.chatService.sendRequest([BigInt(+friendID), BigInt(+myID)]).subscribe((data) => {
        })
        alert("Chat-Anfrage wurde gesendet!");
        window.location.reload()
      }else{
        alert("Während einer aktiven Anfrage oder eines aktives Chats können keine Anfragen gesendet werden!")
      }
    })

  }
}
