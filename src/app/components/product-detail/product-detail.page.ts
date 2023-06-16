import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { Firestore, doc, getDoc,getFirestore ,updateDoc } from '@angular/fire/firestore'

import { ActivatedRoute } from '@angular/router';

import { HttpProvider } from 'src/app/provider/http.provider';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private firestore :Firestore,
    public router:Router,
    private location : Location,
    public service: HttpProvider,
  ) { }

  routeParams: any 

  productDetail: any 

  productDetailId: any 

  actualPrice: any 

  actualPriceRound: any 

  dolarBlue: any

  dolars: any 

  ngOnInit() {
    this.routeParams = this.route.snapshot.params['id']
    this.getCollection() 
  }

  async getCollection(){
    const db = getFirestore();
    const docRef = doc(db, "Stock", "stock");
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      let datos : any = docSnap.data()
      this.productDetail = datos.productos
      this.productDetailId =  this.productDetail[this.routeParams]
      this.getDolars()
    } 
    catch(error) {
        console.log(error)
    }
  }

  getDolars(){
    ( this.service.getTypesDolar()).subscribe((data: any) => { 
      this.updateData(data)
      },
      (error: any) => { 
        console.log(error);
      }
    )
  }

    updateData(data: any){
      this.dolars= data
      this.dolarBlue = this.dolars[1].casa.venta
      this.actualPrice= this.productDetailId.precio  / parseFloat(this.dolarBlue)
      this.actualPriceRound = Math.round(this.actualPrice)
    }

  async deleteProduct(){
        const db = getFirestore();
        const collectionReference = doc(db, "Stock", "stock");
        let deleteProduct : any 
        deleteProduct = this.productDetail.filter(
          ((data: { prenda: any; marca: any; talle: any; precio: any; })  => 
            data.prenda !=  this.productDetailId.prenda ||
            data.marca !=  this.productDetailId.marca ||
            data.talle !=  this.productDetailId.talle  ||
            data.precio !=  this.productDetailId.precio 
        ))
        await updateDoc(collectionReference, {
          productos: deleteProduct
      }); 
      this.router.navigate(['/products']);
  }

  toMenu(){
    this.router.navigate(['/menu']);
  }

  toBack(){
    this.location.back();  
  }

}
