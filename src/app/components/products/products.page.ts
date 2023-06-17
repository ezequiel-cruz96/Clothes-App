import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { Firestore, collection, addDoc, collectionData, doc, getDoc,getFirestore ,deleteDoc,updateDoc, arrayUnion} from '@angular/fire/firestore'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';



(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  pdfObject:any = null

  constructor( 
    private firestore :Firestore,
    public router:Router,
    private location : Location
    ) {}

  ngOnInit() {
    this.getCollection() 
  }

 

  collection: any[] |  undefined;

  prendas =['Remera','Pantalon','Camisa','Campera'];

  talles =['S','M','L','XL'];

  brands =['Adidas','Nike','Puma','Levi'];

  selecTedValue: any 

  selecTedTalle: string = ""

  selecTedBrand:string = ""

  filterProducts: any 

  remeras:any

  places:any

  addData(test:any){
    const collectionInsta =collection(this.firestore,"Stock")
    addDoc(collectionInsta, test)
    .then(() => {
     console.log("sii")
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async getCollection(){
    const db = getFirestore();
    const docRef = doc(db, "Stock", "stock");
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      let datos :any=docSnap.data()
      this.filterProducts= datos.productos
      this.remeras= datos.productos
    } 
    catch(error) {
        console.log(error)
    }
  }

  EliminarDatita(){
    const placeDocRef = doc(this.firestore, `Stock/67pPf3RA53LAAvNkGaxf`);
      deleteDoc(placeDocRef);
      try {
      console.log("Se borro la datita")
    } 
    catch(error) {
        console.log(error)
    }
  }
  
  onSubmit(){
    let test:object ={
      nombre:"test"
    }
      //this.addData(test)  funciooaaa
      // this.EliminarDatita() funcionaaa
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
      this.filterProducts= this.remeras.filter((data: { marca: any; talle: any; }) => data.marca === this.selecTedBrand && data.talle === this.selecTedTalle);
    }else{
      this.filterProducts= this.remeras.filter((data: { talle: string; }) => data.talle === this.selecTedTalle);

    }
  
  }
///marca
  filterByBrand(){
    if(this.selecTedTalle !=""){
      this.filterProducts= this.remeras.filter((data: { marca: any; talle: any; }) => data.marca === this.selecTedBrand && data.talle === this.selecTedTalle);
    }else{
      this.filterProducts= this.remeras.filter((data: { marca: any }) => data.marca === this.selecTedBrand);
    }
  }

  cleanFilters(){
    this.filterProducts= this.remeras
    this.selecTedBrand = ""
    this.selecTedTalle = ""
  }

  async agregar(){

    //Sirve para armar arrays aparte

    const db = getFirestore();


    const washingtonRef = doc(db, "Stock", "stock");

    let test= {
      talle:"M",
      prenda:"camisa",
    }

     this.filterProducts.push(test)
    // Atomically add a new region to the "regions" array field.
    await updateDoc(washingtonRef, {
        productos:  this.filterProducts
    }); 
  }

  async eliminar(){
      //Sirve para armar arrays aparte

      const db = getFirestore();


      const washingtonRef = doc(db, "Stock", "stock");
  
  
      let borrar=  this.filterProducts.filter((data: { talle: any }) => data.talle != "L");
  
      // Atomically add a new region to the "regions" array field.
      await updateDoc(washingtonRef, {
          productos:  borrar
      }); 
  }

    addProduct(){
      this.router.navigate(['/add-products']);

    }
    stockPrint(){

    }

    toDetail(index :any){
      this.router.navigate([`/product-detail/${index}`]);  
    }

    reloadPage(){
      this.getCollection()
    }

    formatPdfProductos(products: any){
      var printProductsList:any=[]
      products.forEach((risk: {
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
                risk.prenda,
                risk.marca,
                risk.talle,
                risk.precio,
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

      let dd = {content: [
        {
          text:`Lista de stock ${ date.toLocaleDateString("en-GB") } `
          , margin: [ 0, 0, 0, 20 ]
        },
        this.formatPdfProductos(this.filterProducts)
      ]};
      pdfMake.createPdf(dd).download(`Stock-${ date.toLocaleDateString("en-GB")+'.pdf' }`)
    }
}