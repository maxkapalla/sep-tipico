import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Chat} from "../Models/Chat";
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";
import {Message} from "../Models/Message";
import {interval, Subscription} from "rxjs";
import {TippRundeService} from "../services/tipp-runde.service";
import {TippRunde} from "../Models/TippRunde";


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
  sub2: Subscription
  rundenid: bigint

  refreshMsg$ = interval(200)
  check$ = interval(3000)

  constructor(private chatService: ChatService, private nutzerService: NutzerService, private rundenService: TippRundeService) {
    this.accepted = new Chat()
    this.myID = BigInt(0);
    this.partnerID = BigInt(0)
    this.clicked = false
    this.name = ""
    this.chatActive= false
    this.messages = []
    this.myName = sessionStorage.getItem("name")!
    this.sub = new Subscription();
    this.sub2 = new Subscription();
    this.rundenid = BigInt(0);
  }

  ngOnInit(): void {
    this.search()
    this.myID = BigInt(sessionStorage.getItem("id")+"")

    this.sub2 = this.check$.subscribe(()=> this.search())
  }


  //if chat is opened
  onOpen(){
    this.clicked = true
    this.sub2.unsubscribe();
    this.sub = this.refreshMsg$.subscribe(()=>{
      if(!sessionStorage.getItem("RundenChat")) {
        this.chatService.receiveMessage(BigInt(+sessionStorage.getItem("Chat")!)).subscribe(data => {
          if (data.length >= 1) {
            this.messages = data.reverse()
          } else {
            alert("Der Nutzer " + this.name + "hat den Chat verlassen! Damit wird der Live-Chat beendet!")
            this.onExit()
          }
        })
      }else if(sessionStorage.getItem("RundenChat")){
        this.chatService.receiveMessage(BigInt(+sessionStorage.getItem("RundenChat")!)).subscribe(data => {
          if (data.length >= 1) {
            this.messages = data.reverse()
          }
        })
      }

    })
  }

  onMinimize(){
    this.clicked = false
    this.sub.unsubscribe()
    this.sub2 = this.check$.subscribe(()=> this.search())
  }

  //if chat is exited
  onExit(){
    this.sub.unsubscribe()
    if(!sessionStorage.getItem("RundenChat")) {
      this.chatService.endChat(this.accepted).subscribe()
      sessionStorage.removeItem("Chat")
    }else{
      this.chatService.leaveTipprundenChat(BigInt(+sessionStorage.getItem("RundenChat")!), this.myID).subscribe()
      sessionStorage.removeItem("RundenChat")
    }
    this.chatActive=false
    this.name = ""
  }


  search(){
    this.chatService.findActiveChat(BigInt(+sessionStorage.getItem("id")!)).subscribe((data: Chat)=>{
      if(data!= null){ //wenn aktive Chats gefunden wurden
        this.accepted = data //speichere in local variable
        if(!sessionStorage.getItem("RundenChat")) {
          sessionStorage.setItem("Chat", this.accepted.id!.toString()) //erstelle sessionstorage chatid
          if(this.accepted.participants![0]== this.myID){ //finde partnerid heraus
            this.partnerID = this.accepted.participants![1]
          }else{
            this.partnerID = this.accepted.participants![0]
          }
          this.nutzerService.getNutzerByID(this.partnerID.toString()).subscribe((data: Nutzer) =>
            this.name = data.firstName! + " " + data.lastName!) //finde partner namen heraus
        }else{
          if(this.name == "") {
            this.rundenService.getTippRundeByID(+sessionStorage.getItem("rundenID")!).subscribe((data: TippRunde) =>
              this.name = data.tipprundeName!) //finde Tipprundename heraus
          }
        }
        sessionStorage.removeItem("chatrequestsent")
        this.chatActive = true; //setze boolean auf true
      }else{
        this.chatActive=false
        sessionStorage.removeItem("Chat")
        this.sub.unsubscribe()
      }
      console.log(this.chatActive)
    })
  }

  send(msg: string){
    let message = new Message();
    if(!sessionStorage.getItem("RundenChat"))
      message.chatID = BigInt(+sessionStorage.getItem("Chat")!)
    if(sessionStorage.getItem("RundenChat"))
      message.chatID = BigInt(+sessionStorage.getItem("RundenChat")!)
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
