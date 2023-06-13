import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { HttpProvider } from 'src/app/provider/http.provider';

import { Firestore, collection, addDoc, collectionData, doc, getDoc,getFirestore ,deleteDoc} from '@angular/fire/firestore'



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
    private firestore :Firestore
  ) {}

  async ngOnInit() {
    await this.getStock()
    await this.getDolars()
  }

  clothesPrice: any 
  
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
    this.actualPrice= this.clothesPrice.remera.precio / parseFloat(this.dolarBlue)
    this.actualPriceRound = Math.round(this.actualPrice)
  }


  async getStock(){
    const db = getFirestore();

    const docRef = doc(db, "Stock", "stock");

    const docSnap = await getDoc(docRef);

    docSnap.data();

    try {
      const docSnap = await getDoc(docRef);

      this.clothesPrice = docSnap.data()
    } 
    catch(error) {
      console.log(error)
    }
  }

  toMenu(){
    this.router.navigate(['/menu']);
  }

  toBack(){
    this.location.back();
  }


}
