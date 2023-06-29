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

    /**
   * Esta funcion Obtiene todos los productos
   */

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

    /**
   * Esta funcion filtra por tipo de prenda
   */

  validate(){
    this.products = this.searchProduct.filter((data: { prenda: string; }) => data.prenda === this.selectedProduct);
  }

    /**
   * Esta funcion nos redirige a la de detalle usando como parametro el id de la prenda
   */

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
