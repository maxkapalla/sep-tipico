import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {TippRunde} from "../Models/TippRunde";
import {TippRundeService} from "../services/tipp-runde.service";

@Component({
  selector: 'app-tipp-runde-create',
  templateUrl: './tipp-runde-create.component.html',
  styleUrls: ['./tipp-runde-create.component.scss']
})
export class TippRundeCreateComponent implements OnInit {

  tippRunden: TippRunde[];
  deleteTippRunde: TippRunde;
  createTippRunde: TippRunde;

  constructor(private route: ActivatedRoute, private TippRundeService: TippRundeService, private router: Router) {
    this.tippRunden= [];
    this.deleteTippRunde= new TippRunde;
    this.createTippRunde= new TippRunde;
  }

  ngOnInit(): TippRunde[] {
    this.TippRundeService.getAll().subscribe((data:any) => this.tippRunden=data);
    return this.tippRunden;
  }

  CreateTippRunde() {
    this.TippRundeService.create(this.createTippRunde).subscribe(result => this.gotoTippRunde(),this.errorWithSubmit);
    console.log();
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
