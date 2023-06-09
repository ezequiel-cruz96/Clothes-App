import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';


import { doc, getDoc, getFirestore , updateDoc } from '@angular/fire/firestore'

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  constructor(
    public router:Router,
    private location : Location,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getCollection() 
  }

  prendas = ['Remera','Pantalon','Short','Campera','Sueter','Buzo'];

  talles = ['S','M','L','XL'];

  marcas = ['Generica','Adidas','Nike','Puma','Levi'];

  selecTedTalle: string = ""

  selecTedPrenda: string = ""

  selecTedMarca: string = ""

  selectedPrice : number = 0

  selectedStock : number = 0

  products: any 

  /**
   * Esta funcion limpia los campos de los inputs
   */

  cleanFields(){
    this.selecTedTalle = ""
    this.selecTedPrenda = ""
    this.selecTedMarca = ""
    this.selectedPrice = 0
    this.selectedStock = 0
  }

  /**
   * Esta funcion obtiene la coleccion de nuesta base en firebase
   * La funcion getFirestore obtiene nuesta base de datos
   * La funcion getDoct recibe el nombre y el id de nuestra coleccion para acceder
   * La variabledocSnap.data() recibe los datos de la colleccion
   * Los datos se guardan en la variable products
   */

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
        this.presentAlert(error)
      }
    }

  /**
   * Esta funcion agrega productos en nuestra coleccion de firebase
   * La funcion updateDoc recibe la coleccion que queremos modificar y la modificacion 
   * Lo hace a traves de productList(ref a nuestra base) y data (datos que queremos cargar)
   */

  async addProduct(){
    var generateId 
    if(this.products.length ==""){
      generateId = 0
    }
    else{
      generateId = this.products[ this.products.length - 1].id + 1
    }
      const db = getFirestore();
      const productsList = doc(db, "Stock", "stock");
      let newProduct = {
        id: generateId ,
        prenda: this.selecTedPrenda,
        marca: this.selecTedMarca,
        talle: this.selecTedTalle,
        precio: this.selectedPrice,
        stock: this.selectedStock
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
        this.presentAlert(error)
      })
  }

  /**
   * Esta funcion nos redirige a la vista Menu
   */

  toMenu(){
    this.router.navigate(['/menu']);
  }

  /**
   * Esta funcion nos redirige a la vista anterior
   */

  toBack(){
    this.location.back();
  }

    /**
   * Esta funcion es una alerta que muestra los errores que puedan surgir
   * Segun el tipo de error devuelve un mensaje distinto
   */

    async presentAlert(error : any) {
      const alert = await this.alertController.create({
        message: error.message,   
      });
      await alert.present();
    }
  
}
