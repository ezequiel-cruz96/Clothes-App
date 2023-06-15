import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { Firestore, collection, addDoc, collectionData, doc, getDoc,getFirestore ,deleteDoc} from '@angular/fire/firestore'


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

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

  selecTedValue: any 

  selecTedTalle: any 

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

  filterByHigh(){
    this.filterProducts= this.remeras.filter((data: { talle: string; }) => data.talle === this.selecTedTalle);
  }

}
