import { Component, OnInit } from '@angular/core';
import {Chat} from "../Models/Chat";
import {ChatService} from "../services/chat.service";
import {NutzerService} from "../services/nutzer.service";


@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.component.html',
  styleUrls: ['./chat-requests.component.scss']
})
export class ChatRequestsComponent implements OnInit {

  requests: Chat[]
  participants: Map<Chat, string>

  constructor(private chatService: ChatService, private nutzerService: NutzerService) {
    this.requests = []
    this.participants = new Map<Chat, string>()
  }

  ngOnInit(): void {
    this.chatService.getRequests(BigInt(sessionStorage.getItem("id")+"")).subscribe((data: any) =>{
      this.requests= data
      for(let req of data){
        this.nutzerService.getNutzerByID(req.participants[1].toString()).subscribe(data => this.participants.set(req,
          data.firstName + " " + data.lastName))
      }
    })
  }

  onAccept(id: number, participants: bigint[]){
    if(sessionStorage.getItem("Chat")== null) {
      this.chatService.acceptRequest(BigInt(id)).subscribe((data) => {
        sessionStorage.setItem("Chat", data.id!.toString())
        this.chatService.deleteAllRequests(participants).subscribe()
      })
      window.location.reload();
    }else{
      alert("Während eines aktiven Chats kann keine Anfrage angenommen werden. " +
        "Bitte verlassen Sie Ihren aktiven Chat, um einen anderen Chat anzufangen")
    }
  }

  onReject(id: number){
    this.chatService.rejectRequest(BigInt(id)).subscribe()
  }
}
