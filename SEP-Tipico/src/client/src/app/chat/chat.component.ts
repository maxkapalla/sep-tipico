import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Chat} from "../Models/Chat";
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";
import {Message} from "../Models/Message";
import {interval, Subscription} from "rxjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  myID: bigint
  partnerID: bigint
  accepted: Chat
  clicked: boolean
  name: string
  chatActive: boolean
  messages: Message[]
  myName :string
  sub: Subscription

  refreshMsg$ = interval(550)

  constructor(private chatService: ChatService, private nutzerService: NutzerService) {
    this.accepted = new Chat()
    this.myID = BigInt(0);
    this.partnerID = BigInt(0)
    this.clicked = false
    this.name = ""
    this.chatActive= false
    this.messages = []
    this.myName = sessionStorage.getItem("name")!
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    this.search()
    this.myID = BigInt(sessionStorage.getItem("id")+"")

    setInterval(()=>{
      this.search();
      console.log("Requests wurden gesucht")
    }, 3000)
  }


  //if chat is opened
  onOpen(){
    this.clicked = true
    this.sub = this.refreshMsg$.subscribe(()=>{
      this.chatService.receiveMessage(BigInt(+sessionStorage.getItem("Chat")!)).subscribe(data=>{
        this.messages = data
      })
    })
  }

  onMinimize(){
    this.clicked = false
    this.sub.unsubscribe()
  }

  //if chat is exited
  onExit(){
    this.sub.unsubscribe()
    this.chatService.endChat(this.accepted).subscribe()
    sessionStorage.removeItem("Chat")
    this.chatActive=false
    this.name = ""
  }


  search(){
    this.chatService.findActiveChat(BigInt(+sessionStorage.getItem("id")!)).subscribe((data: Chat)=>{
      if(data!= null){ //wenn aktive Chats gefunden wurden
        this.accepted = data //speichere in local variable
        sessionStorage.setItem("Chat", this.accepted.id!.toString()) //erstelle sessionstorage chatid
        this.chatActive = true; //setze boolean auf true
        if(this.accepted.participants![0]== this.myID){ //finde partnerid heraus
          this.partnerID = this.accepted.participants![1]
        }else{
          this.partnerID = this.accepted.participants![0]
        }
        this.nutzerService.getNutzerByID(this.partnerID.toString()).subscribe((data:Nutzer )=>
          this.name = data.firstName! + " " + data.lastName!) //finde partner namen heraus
        // this.receive(BigInt(sessionStorage.getItem("activeChat")!)) //hole alle nachrichten für aktiven chat
      }else{
        this.chatActive=false
        sessionStorage.removeItem("activeChat")
        this.sub.unsubscribe()
      }
      console.log(this.chatActive)
    })
  }

  send(msg: string){
    let message = new Message();
    message.chatID = BigInt(+sessionStorage.getItem("activeChat")!)
    message.sender = this.myID;
    message.content = msg;
    message.time = this.getTime();
    message.name = this.myName;
    console.log(message.name)
    this.chatService.sendMessage(message).subscribe()
  }


  getTime(): string{
    let event = new Date();
    let hours = event.getHours().toString();
    let mins = event.getMinutes().toString();
    if(hours.length == 1)
      hours = "0"+hours;
    if(mins.length == 1)
      mins = "0"+mins;

    return hours+":"+mins;
  }

}
