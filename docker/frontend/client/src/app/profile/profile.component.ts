import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  url: string=""
  name:string =""
  email:string=""
  birthdate: string=""
  role:string =""

  constructor() { }

  ngOnInit(): void {
    this.url = sessionStorage.getItem('picURL')+""
    this.name= sessionStorage.getItem('name')+""
    this.email= sessionStorage.getItem('email')+""
    this.birthdate = sessionStorage.getItem('birthday')+""
    this.role = (sessionStorage.getItem('role')+"").toUpperCase()
  }

}
