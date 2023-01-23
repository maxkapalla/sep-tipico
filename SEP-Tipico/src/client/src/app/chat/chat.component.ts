import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatNum = 1;

  constructor() { }

  ngOnInit(): void {
    // get all chats and check if any Long in List is my id
    // get chats where my id is in chats[]
    // give chatNum the value of chats.length
  }

  //param is the chat that was clicked on
  onClick(){

  }

}
