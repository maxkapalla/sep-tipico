import {Component, OnInit} from '@angular/core';
import {TippRunde} from "../Models/TippRunde";
import {Router} from "@angular/router";
import {TippRundeService} from "../services/tipp-runde.service";
import {TippService} from "../services/tipp.service";
import {Tipper} from "../Models/Tipper";
import {ChatService} from "../services/chat.service";


@Component({
  selector: 'app-tipprunde-drinne',
  templateUrl: './tipprunde-drinne.component.html',
  styleUrls: ['./tipprunde-drinne.component.scss']
})
export class TipprundeDrinneComponent implements OnInit {
  id: number;
  nutzerid: number | undefined;
  tippende: Tipper[];
  tipper: Tipper;
  tippRunde: TippRunde;
  password: string = "";
  isInRunde: boolean;

  searchInput: String = "";
  searchType: String = "TipperName";

  constructor(private TippRundeService: TippRundeService, private TippService: TippService,
              private router: Router, private chatService: ChatService) {
    this.tippRunde = new TippRunde;
    this.id = 0;
    this.tippende = [];
    this.tipper = new Tipper()
    this.isInRunde = false
  }

  ngOnInit(): Tipper[] {
    this.checkPW()
    var x = sessionStorage.getItem('rundenID') + "";
    this.id = +x;
    console.log(x);
    this.TippRundeService.getTippRundeByID(this.id).subscribe((data: any) => this.tippRunde = data)
    console.log(this.tippRunde.id)
    this.TippService.checkIfTipperInRunde(BigInt(this.id),BigInt(+sessionStorage.getItem("id")!)).subscribe(data=>
      this.isInRunde = data)
    this.TippService.getAllTipperByRunde(this.id).subscribe((data: any) => this.tippende = data);
    return this.tippende;
  }

  onSubmit() {
    var z = sessionStorage.getItem('id') + "";
    this.nutzerid = +z;

    this.tipper.nutzerid = BigInt(z);
    this.tipper.tipprundenID = this.tippRunde.id;
    this.TippService.saveTipper(this.tipper).subscribe(result => this.goToRound(), this.errorHand)
  }

  goToRound() {
    window.location.reload();
  }

  errorHand() {
    alert("a")
  }

  anschaueProfil(tipper: Tipper) {
    console.log(tipper);
    sessionStorage.setItem("TipperID", tipper.id + "");
    this.router.navigate(['/tipper-profile', tipper.id]);
  }

  submitSearch(input: String) {
    switch (this.searchType) {
      case "TipperName":
        this.TippService.getTipperByNickname(input).subscribe(data => {
          this.tippende = data
        });
        break;
    }
  }

  async checkPW() {
    var z = sessionStorage.getItem("rundenID") + ""
    let y: number = +z
    console.log("y: " + y)
    await this.TippRundeService.getTippRundeByID(y).subscribe(response => {
      this.tippRunde = response
      let pwToCheck = this.tippRunde.password
      if (pwToCheck == null) {
        pwToCheck = ""
      }
      if (!(pwToCheck == sessionStorage.getItem("rundenPw"))) {
        this.router.navigate(['/home'])
      }
      //sessionStorage.removeItem("rundenPw")
    })
  }


  joinTipprundenChat() {
    console.log(this.tippRunde.chatID)
    if (!sessionStorage.getItem("RundenChat") || !sessionStorage.getItem("Chat")) {
      this.chatService.joinTipprundenChat(this.tippRunde.id!, BigInt(+(sessionStorage.getItem('id')!))).subscribe((data) => {
        sessionStorage.setItem("RundenChat", data.id!.toString())
        window.location.reload();
      })
    }else{
      alert("Während eines aktiven Chats kann kein neuer Chat angefangen werden.")
    }
  }
}
