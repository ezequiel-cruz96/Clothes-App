import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpProvider } from 'src/app/provider/http.provider';


@Component({
  selector: 'app-liquidations',
  templateUrl: './liquidations.page.html',
  styleUrls: ['./liquidations.page.scss'],
})
export class LiquidationsPage implements OnInit {

  constructor(

    public service: HttpProvider, 
    public http: HttpClient,
  ) { }

  ngOnInit() {
   this.getDolars()
  }

  dolars: any 

    getDolars(){
      ( 
      this.service.getTypesDolar()).subscribe(
      (data: any) => { this.dolars = data},
      (error: any) => { console.log(error);}
      )
  }

}
