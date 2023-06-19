import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { HttpProvider } from 'src/app/provider/http.provider';

@Component({
  selector: 'app-liquidations',
  templateUrl: './liquidations.page.html',
  styleUrls: ['./liquidations.page.scss'],
})
export class LiquidationsPage implements OnInit {

  constructor(
    public router:Router,
    public service: HttpProvider, 
    private location : Location,
  ) {}

  ngOnInit() {
    this.getDolars()
  }

  dolarBlue: any

  dolars: any 

  getDolars(){( 
    this.service.getTypesDolar()).subscribe(
    (data: any) => {  this.dolars = data},
    (error: any) => { console.log(error);}
    )
  }

  toProducts(){
    this.router.navigate(['/products'])
  }

  toMenu(){
    this.router.navigate(['/menu']);
  }

  toBack(){
    this.location.back();
  }

}
