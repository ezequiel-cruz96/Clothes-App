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

  collection: any[] |  undefined;

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

  

  prendas =['Remera','Pantalon','Camisa','Campera'];

  talles =['S','M','L','XL'];

  selecTedValue: any 

  selecTedTalle: any 
  

  async pedirDatita(){
    const db = getFirestore();

    const docRef = doc(db, "Stock", "stock");

    const docSnap = await getDoc(docRef);

    docSnap.data();

    try {
      const docSnap = await getDoc(docRef);

      this.datos=docSnap.data()

      console.log(this.datos.remera.precio);

  } catch(error) {
      console.log(error)
  }
  }


  datos:any

  places:any

  EliminarDatita(){


      const placeDocRef = doc(this.firestore, `Stock/67pPf3RA53LAAvNkGaxf`);
       deleteDoc(placeDocRef);

       try {
        console.log("Se borro la datita")
  
    } catch(error) {
        console.log(error)
    }


  

  }

  ngOnInit() {
    this.pedirDatita() 
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

}
