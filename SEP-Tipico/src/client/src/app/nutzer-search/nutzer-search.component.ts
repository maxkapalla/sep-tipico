import { Component, OnInit } from '@angular/core';
import {NutzerService} from "../services/nutzer.service";
import {Nutzer} from "../Models/Nutzer";

@Component({
  selector: 'app-nutzer-search',
  templateUrl: './nutzer-search.component.html',
  styleUrls: ['./nutzer-search.component.scss']
})
export class NutzerSearchComponent implements OnInit {

  nutzerName: string|undefined;
  nutzers: Nutzer[];
  email =""
  constructor(private service: NutzerService) {this.nutzers = [] }


  ngOnInit(): void {
    this.email = sessionStorage.getItem('email')+""
  }

  onSubmit(){
    var firsName = ""
    var lastName = ""
    if(this.nutzerName != null){
      if(this.nutzerName.includes(" ")){
        var splitStr = this.nutzerName.split(' ')
        firsName = splitStr[0]
        lastName = splitStr[1]
        this.service.searchUser(firsName,lastName).subscribe((data: any) => this.nutzers = data)
      }else{
        firsName = this.nutzerName
        this.service.searchUserByOneNameOnly(firsName).subscribe((data: any) => this.nutzers = data)
      }
    }
  }

}
