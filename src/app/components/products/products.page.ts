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

  selecTedBrand: string = ""

  filterProducts: any 

  products:any

  /**
   * Esta funcion obtiene la coleccion de nuesta base en firebase
   * La funcion getFirestore obtiene nuesta base de datos
   * La funcion getDoct recibe el nombre y el id de nuestra coleccion para acceder
   * La variabledocSnap.data() recibe los datos de la colleccion
   * Los datos se guardan en la variable filterProducts y products
   */

  async getCollection(){
    const db = getFirestore();
    const docRef = doc(db, "Stock", "stock");
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      let datos :any = docSnap.data()
      this.filterProducts = datos.productos
      this.products = datos.productos
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

  /**
   * Esta funcion filtra nuestros productos por talle
   * Si el filtro de marca esta activo tambien filtra por ese filtro
   */

  filterByHigh(){
    if(this.selecTedBrand != ""){
      this.filterProducts = this.products.filter((data: { marca: any; talle: any; }) => data.marca === this.selecTedBrand && data.talle === this.selecTedTalle);
    }else{
      this.filterProducts = this.products.filter((data: { talle: string; }) => data.talle === this.selecTedTalle);
    }
  }

  /**
   * Esta funcion filtra nuestros productos por marca
   * Si el filtro de talle esta activo tambien filtra por ese filtro
   */

  filterByBrand(){
    if(this.selecTedTalle != ""){
      this.filterProducts = this.products.filter((data: { marca: any; talle: any; }) => data.marca === this.selecTedBrand && data.talle === this.selecTedTalle);
    }else{
      this.filterProducts = this.products.filter((data: { marca: any }) => data.marca === this.selecTedBrand);
    }
  }


  /**
   * Esta funcion limpia los campos y muestra todos los productos del inventario
   */

  cleanFilters(){
    this.filterProducts = this.products
    this.selecTedBrand = ""
    this.selecTedTalle = ""
  }

  /**
   * Esta funcion nos redirige a la vista de productos
   */

  addProduct(){
    this.router.navigate(['/add-products']);
  }

  /**
   * Esta funcion nos redirige a la vista de detalle de productos
   * Depende del id del producto para mostrarnos su detalle
   */

  toDetail(index :any){
    this.router.navigate([`/product-detail/${index}`]);  
  }

  /**
   * Esta funcion actualiza el inventario
   */

  reloadPage(){
    this.getCollection()
  }

  /**
   * Esta funcion crea la estructura de nuestro pdf con la libreria PDFMAKE
   * Recorre nuestro array de productos seteandolos en filas y columnas
   */

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

  /**
   * Esta funcion descarga nuestra lista de productos
   * La lista de productos depende del filtrado de productos
   */

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