import { Component, OnInit } from '@angular/core';
import {Chat} from "../Models/Chat";
import {ChatService} from "../services/chat.service";
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.component.html',
  styleUrls: ['./chat-requests.component.scss']
})
export class ChatRequestsComponent implements OnInit {

  requests: Chat[]
  participants: Nutzer[]
  constructor(private chatService: ChatService, private nutzerService: NutzerService) {
    this.requests = []
    this.participants = []
  }

  ngOnInit(): void {
    this.chatService.getRequests(BigInt(sessionStorage.getItem("id")+"")).subscribe((data: any) =>
      this.requests= data)
    setInterval(() => {
      this.chatService.getRequests(BigInt(sessionStorage.getItem("id")+"")).subscribe((data: any) =>
        this.requests= data)
    },750)
  }

  onAccept(id: number){
      this.chatService.acceptRequest(BigInt(id)).subscribe((data) => {
        sessionStorage.setItem("activeChat", data.id!.toString())
        this.chatService.deleteAllRequests(BigInt(id))
      })
    window.location.reload();
  }

  onReject(id: number){
    this.chatService.rejectRequest(BigInt(id)).subscribe()
  }
}
