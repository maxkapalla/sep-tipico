import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {map, Observable} from "rxjs";

//mport {Liga} from Liga;

@Component({
  selector: 'app-liga-see',
  templateUrl: './liga-see.component.html',
  styleUrls: ['./liga-see.component.scss']
})
export class LigaSeeComponent implements OnInit {

  ligen: Liga[];


  constructor(private route: ActivatedRoute, private LigaService: LigaService, private router: Router) {
    this.ligen = [];
  }


  ngOnInit(): Liga[] {
    this.LigaService.getAll().subscribe((data: any) => this.ligen = data);
    return this.ligen

  }

}
