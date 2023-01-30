import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../Models/Chat";
import {Message} from "../Models/Message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatURL: String;

  constructor(private http: HttpClient) {
    this.chatURL = 'http://localhost:8080/chat'
  }

  getRequests(id: bigint): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.chatURL + '/requests/'+id)
  }

  sendRequest(ids: bigint[]): Observable<string>{
    console.log("Request senden.....")
    return this.http.post<string>(this.chatURL+'/request', ids)
  }

  acceptRequest(chatID: bigint): Observable<Chat>{
    console.log("Chat " + chatID+ " wird angenommen")
    return this.http.get<Chat>(this.chatURL + '/accept/'+ chatID)
  }

  rejectRequest(chatID: bigint): Observable<Chat>{
    console.log("Chat " + chatID+ " wird abgelehnt")
    return this.http.get<Chat>(this.chatURL + '/reject/'+ chatID)
  }

  findActiveChat(id: bigint): Observable<Chat>{
    return this.http.get<Chat>(this.chatURL+ '/myChat/' + id)
  }

  endChat(chat: Chat): Observable<Chat>{
    console.log("Chat ending...")
    return this.http.post<Chat>(this.chatURL+"/endChat", chat)
  }

  sendMessage(message: Message): Observable<Message>{
    console.log(message.content)
    return this.http.post<Message>(this.chatURL+"/sndMsg", message)
  }

  receiveMessage(chatID: bigint): Observable<Message[]>{
    return this.http.get<Message[]>(this.chatURL+"/getMsg/"+chatID)
  }

  deleteAllRequests(participants: bigint[]): Observable<any>{
    console.log("sending deleteRequest")
    return this.http.post(this.chatURL+"/deleteRequests", participants)
  }

  getMySentRequests(id: bigint): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.chatURL+"/myRequests/"+id)
  }

  joinTipprundenChat(runde: bigint, myID: bigint): Observable<Chat>{
    return this.http.get<Chat>(this.chatURL+"/joinRundenChat/"+runde+"/"+myID)
  }

  leaveTipprundenChat(chatID: bigint, myID: bigint): Observable<Chat>{
    return this.http.get<Chat>(this.chatURL+"/leaveRundenChat/"+chatID+"/"+myID)
  }

  createTippRundenChat(): Observable<Chat>{
    return this.http.get<Chat>(this.chatURL+"/tipprundenChat")
  }


}
