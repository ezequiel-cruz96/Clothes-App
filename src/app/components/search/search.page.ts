import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { Firestore, doc, getDoc, getFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor( 
    private firestore :Firestore,
    public router:Router,
    private location : Location
    ) {}

  ngOnInit() {
    this.getCollection() 
  }

  searchProduct: any 

  selectedProduct: any 

  products: any 

  async getCollection(){
    const db = getFirestore();
    const docRef = doc(db, "Stock", "stock");
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      let datos :any = docSnap.data()
      this.searchProduct = datos.productos
    } 
    catch(error) {
        console.log(error)
    }
  }

  validate(){
    this.products = this.searchProduct.filter((data: { prenda: string; }) => data.prenda === this.selectedProduct);
  }

  toDetail(product :any){
    this.router.navigate([`/product-detail/${product.id}`]);  
  }

   /**
   * Esta funcion nos redirige a la vista Menu
   */

   toMenu(){
    this.selectedProduct = ""
    this.router.navigate(['/menu']);
  }

  /**
   * Esta funcion nos redirige a la vista anterior
   */

  toBack(){
    this.selectedProduct = ""
    this.location.back();
  }
}
