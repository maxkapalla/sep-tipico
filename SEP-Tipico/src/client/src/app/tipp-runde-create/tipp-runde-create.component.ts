import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-tipp-runde-create',
  templateUrl: './tipp-runde-create.component.html',
  styleUrls: ['./tipp-runde-create.component.scss']
})
export class TippRundeCreateComponent implements OnInit {

  liga: Liga;
  ligen: Liga[];
  tippRunden: TippRunde[];
  deleteTippRunde: TippRunde;
  createTippRunde: TippRunde;
  name: string = "";
  id: number;

  constructor(private ligaService: LigaService, private TippRundeService: TippRundeService, private router: Router,
              private chatService: ChatService) {
    this.ligen = [];
    this.liga = new Liga();
    this.tippRunden = [];
    this.deleteTippRunde = new TippRunde;
    this.createTippRunde = new TippRunde;

    this.id = 0;
  }

  ngOnInit(): void {
    this.ligaService.getAll().subscribe((data: any) => this.ligen = data);
  }

  CreateTippRunde(){
    this.createTippRunde.besitzer = sessionStorage.getItem("id") + "";
    if (this.createTippRunde.password == "") {
      this.createTippRunde.password = undefined
    }
    this.chatService.createTippRundenChat().subscribe(data=>{
      this.createTippRunde.chatID = data.id
      this.TippRundeService.create(this.createTippRunde).subscribe(result => this.gotoTippRunde(), this.errorWithSubmit);
    })

  }

  DeleteTippRunde() {
    this.TippRundeService.delete(this.deleteTippRunde).subscribe(() => this.ngOnInit());
  }

  gotoTippRunde() {
    alert("Tipprunde erfolgreich erstellt!")
    this.router.navigate(['/tipp-runde']);
  }

  errorWithSubmit() {
    alert("Etwas ist schief gelaufen")
  }
}
