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
    private location : Location

  ) { 


  }

  ngOnInit() {
   this.getDolars()
  }

  clothesPrice: any = 1250
  
  dolarBlue: any

  dolars: any 

  actualPrice: any 

  actualPriceRound: any 

    getDolars(){
      ( 
      this.service.getTypesDolar()).subscribe(
      (data: any) => { this.updateData(data)},
      (error: any) => { console.log(error);}
      )
  }

  updateData(data: any){
    this.dolars= data
    this.dolarBlue = this.dolars[1].casa.venta
    this.actualPrice= this.clothesPrice / parseFloat(this.dolarBlue)
    this.actualPriceRound=Math.round(this.actualPrice)
  }

  toMenu(){
    this.router.navigate(['/menu']);
  }

  toBack(){
    this.location.back();
  }


}
