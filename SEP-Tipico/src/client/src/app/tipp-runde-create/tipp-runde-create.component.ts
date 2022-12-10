import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";

@Component({
  selector: 'app-tipp-runde-create',
  templateUrl: './tipp-runde-create.component.html',
  styleUrls: ['./tipp-runde-create.component.scss']
})
export class TippRundeCreateComponent implements OnInit {

  liga:Liga;
  ligen: Liga[];
  tippRunden: TippRunde[];
  deleteTippRunde: TippRunde;
  createTippRunde: TippRunde;
  name:string="";

  constructor(private ligaService: LigaService,private route: ActivatedRoute, private TippRundeService: TippRundeService, private router: Router) {
    this.ligen=[];
    this.liga = new Liga();
    this.tippRunden= [];
    this.deleteTippRunde= new TippRunde;
    this.createTippRunde= new TippRunde;

  }

  ngOnInit(): void {
    this.ligaService.getAll().subscribe((data: any) => this.ligen = data);
  }

  CreateTippRunde() {
    this.TippRundeService.create(this.createTippRunde).subscribe(result => this.gotoTippRunde(),this.errorWithSubmit);
    this.name=sessionStorage.getItem("name")+"";
  }

  DeleteTippRunde() {
    this.TippRundeService.delete(this.deleteTippRunde).subscribe(()=>this.ngOnInit());
  }

  gotoTippRunde() {
    alert("Tipprunde erfolgreich erstellt!")
    this.router.navigate(['/tipp-runde']);
  }

  errorWithSubmit(){
    alert("Etwas ist schief gelaufen")

  }
}
