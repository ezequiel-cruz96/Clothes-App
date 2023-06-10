import { Component, OnInit } from '@angular/core';

import { Firestore, collection, addDoc, collectionData, doc, getDoc,getFirestore ,deleteDoc} from '@angular/fire/firestore'


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor( private firestore :Firestore) { }

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
  

  async pedirDatita(){
    const db = getFirestore();

    const docRef = doc(db, "Stock", "stock");

    const docSnap = await getDoc(docRef);

    docSnap.data();

    try {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      this.datos=docSnap.data()

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
    //this.pedirDatita() funcionaaaaaa
  }

 onSubmit(){

  let test:object ={
    nombre:"test"
  }
    //this.addData(test)  funciooaaa

     // this.EliminarDatita() funcionaaa

  }
}
