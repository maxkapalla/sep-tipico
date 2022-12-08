import { Component, OnInit } from '@angular/core';
import {Nutzer} from "../Models/Nutzer";
import {NutzerService} from "../services/nutzer.service";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  nutzers: Nutzer[];
  id: number;

  constructor(private service: NutzerService) { this.nutzers = []; this.id = 0}

  ngOnInit(): void {
    var preID = sessionStorage.getItem('id')+""
    this.id = +preID;
    console.log(preID)
    this.service.getFriends(this.id).subscribe((data: any) => this.nutzers = data)
  }

  removeFriend() {

  }

}
