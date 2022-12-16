import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";

//mport {Liga} from Liga;

@Component({
  selector: 'app-liga-see',
  templateUrl: './liga-create.component.html',
  styleUrls: ['./liga-create.component.scss']
})
export class LigaCreateComponent implements OnInit {

  ligen: Liga[];
  changeliga: Liga;
  deleteliga: Liga;
  createLiga: Liga;

  constructor(private LigaService: LigaService, private router: Router) {
    this.ligen = [];
    this.changeliga = new Liga;
    this.deleteliga = new Liga;
    this.createLiga = new Liga;
  }


  ngOnInit(): Liga[] {
    if (sessionStorage.getItem('role') == "user") { //falls user dann route zu home
      this.router.navigate(['/home'])
    }

    this.LigaService.getAll().subscribe((data: any) => this.ligen = data);
    return this.ligen
  }

  onChangeName() {
    this.LigaService.changeName(this.changeliga).subscribe(() => this.ngOnInit());
  }

  onDelete() {

    this.LigaService.delete(this.deleteliga).subscribe(() => this.ngOnInit());
  }

  onCreateLiga() {
    this.LigaService.create(this.createLiga).subscribe(() => this.ngOnInit());


  }

  onFlush() {
    this.LigaService.flush().subscribe(() => this.ngOnInit());

  }

  onRandomCreate() {
    this.LigaService.randomCreate().subscribe(() => this.ngOnInit());

  }


}
