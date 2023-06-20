import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { Firestore, doc, getDoc, getFirestore } from '@angular/fire/firestore'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  pdfObject : any = null

  constructor( 
    private firestore :Firestore,
    public router:Router,
    private location : Location
    ) {}

  ngOnInit() {
    this.getCollection() 
  }

  collection: any[] |  undefined;

  prendas = ['Remera','Pantalon','Camisa','Campera'];

  talles = ['S','M','L','XL'];

  brands = ['Adidas','Nike','Puma','Levi'];

  selecTedValue: any 

  selecTedTalle: string = ""

  selecTedBrand:string = ""

  filterProducts: any 

  remeras:any

  places:any

  async getCollection(){
    const db = getFirestore();
    const docRef = doc(db, "Stock", "stock");
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      let datos :any = docSnap.data()
      this.filterProducts = datos.productos
      this.remeras = datos.productos
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

  //talle
  filterByHigh(){
    if(this.selecTedBrand !=""){
      this.filterProducts = this.remeras.filter((data: { marca: any; talle: any; }) => data.marca === this.selecTedBrand && data.talle === this.selecTedTalle);
    }else{
      this.filterProducts = this.remeras.filter((data: { talle: string; }) => data.talle === this.selecTedTalle);
    }
  }
///marca
  filterByBrand(){
    if(this.selecTedTalle != ""){
      this.filterProducts = this.remeras.filter((data: { marca: any; talle: any; }) => data.marca === this.selecTedBrand && data.talle === this.selecTedTalle);
    }else{
      this.filterProducts = this.remeras.filter((data: { marca: any }) => data.marca === this.selecTedBrand);
    }
  }

  cleanFilters(){
    this.filterProducts = this.remeras
    this.selecTedBrand = ""
    this.selecTedTalle = ""
  }

  addProduct(){
    this.router.navigate(['/add-products']);
  }

  toDetail(index :any){
    this.router.navigate([`/product-detail/${index}`]);  
  }

  reloadPage(){
    this.getCollection()
  }

  formatPdfProductos(products: any){
    var printProductsList:any=[]
    products.forEach((lista: {
      talle: any;
      marca: any;
      prenda: any; 
      precio: any; 
    }) => {
      printProductsList.push({
        table: {
          body: [
            [
              'Prenda',
              'Marca',
              'Talle',
              'Precio'
            ],
            [
              lista.prenda,
              lista.marca,
              lista.talle,
              lista.precio,
            ],
          ]
        }
        , margin: [ 0, 0, 0, 20 ]
      });
      
    });
    return printProductsList;   
  }

  downloadStock(){
    let date = new Date();
    let documentFormat = {content: [
      {
        text:`Lista de stock ${ date.toLocaleDateString("en-GB") } `
        , margin: [ 0, 0, 0, 20 ]
      },
      this.formatPdfProductos(this.filterProducts)
    ]};
    pdfMake.createPdf(documentFormat).download(`Stock-${ date.toLocaleDateString("en-GB")+'.pdf' }`)
  }

}