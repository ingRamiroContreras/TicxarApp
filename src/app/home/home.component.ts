import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  url: string;
  autorization: string;

  constructor() {}

  ngOnInit() {

    this.url = environment.api_url;
    this.autorization = environment.authorization;
    
  }



}
