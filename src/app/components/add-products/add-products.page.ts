import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { doc, getDoc, getFirestore , updateDoc } from '@angular/fire/firestore'

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  constructor(
    public router:Router,
    private location : Location
  ) { }

  ngOnInit() {
    this.getCollection() 
  }

  prendas =['Remera','Pantalon','Camisa','Campera'];

  talles =['S','M','L','XL'];

  marcas =['Adidas','Nike','Puma','Levi'];

  selecTedTalle: string = ""

  selecTedPrenda: string = ""

  selecTedMarca: string = ""

  selectedPrice : number = 0

  products: any 


  cleanFields(){
    this.selecTedTalle = ""
    this.selecTedPrenda = ""
    this.selecTedMarca = ""
    this.selectedPrice = 0
  }

  async getCollection(){
    const db = getFirestore();
    const docRef = doc(db, "Stock", "stock");
    const docSnap = await getDoc(docRef);
    docSnap.data();
      try {
        const docSnap = await getDoc(docRef);
        let datos :any = docSnap.data()
        this.products = datos.productos
      } 
      catch(error) {
          console.log(error)
      }
    }

  async addProduct(){
      const db = getFirestore();
      const productsList = doc(db, "Stock", "stock");
      let newProduct = {
        prenda: this.selecTedPrenda,
        marca: this.selecTedMarca,
        talle: this.selecTedTalle,
        precio: this.selectedPrice
      }
      this.products.push(newProduct)
      const data = {
        productos:  this.products
      };  
      updateDoc(productsList, data)
      .then(results => {
        this.router.navigate(['/products']);   
        })
      .catch(error => {
          console.log(error);
      })
  }

  toMenu(){
    this.router.navigate(['/menu']);
  }

  toBack(){
    this.location.back();
  }
}
