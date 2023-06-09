import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { Firestore, doc, getDoc,getFirestore ,updateDoc } from '@angular/fire/firestore'

import { ActivatedRoute } from '@angular/router';

import { HttpProvider } from 'src/app/provider/http.provider';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private firestore :Firestore,
    public router:Router,
    private location : Location,
    public service: HttpProvider,
    private alertController: AlertController
  ) { }

  routeParams: any 

  productDetail: any 

  productDetailId: any 

  actualPrice: any 

  actualPriceRound: any 

  dolarBlue: any

  dolars: any 

  selectedPrice: number = 0

  selectedStock: number = 0

  ngOnInit() {
    this.routeParams = this.route.snapshot.params['id']
    this.getCollection() 
  }

  /**
   * Esta funcion obtiene la coleccion de nuesta base en firebase
   * La funcion getFirestore obtiene nuesta base de datos
   * La funcion getDoct recibe el nombre y el id de nuestra coleccion para acceder
   * La variabledocSnap.data() recibe los datos de la colleccion
   * Los datos se guardan en la variable productDetail
   * Identificamos el indice de nuestro producto y guardamos en productDetailId
   */

  async getCollection(){
    const db = getFirestore();
    const docRef = doc(db, "Stock", "stock");
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      let datos : any = docSnap.data()
      this.productDetail = datos.productos
      let productInfo= this.productDetail.filter((data: { id: any }) => data.id == this.routeParams);
      this.productDetailId = productInfo[0]
      this.getDolars()
    } 
    catch(error) {
      this.presentAlert(error)
    }
  }

  /**
   * Esta funcion funcion obtiene los valores de los dolares de la querie
   * Los resultados se pasan por parametro en la funcion update data
   */

  getDolars(){
    ( this.service.getTypesDolar()).subscribe((data: any) => { 
      this.updateData(data)
      },
      (error: any) => { 
        this.presentAlert(error)
      }
    )
  }

  /**
   * Esta funcion calcula el monto en dolares de nuestro producto
   */

    updateData(data: any){
      this.dolars = data
      this.dolarBlue = this.dolars[1].casa.venta
      this.actualPrice = this.productDetailId.precio  / parseFloat(this.dolarBlue)
      this.actualPriceRound = Math.round(this.actualPrice)
    }

  /**
   * Esta funcion elimina nuestro producto de la base datos de Firebase
   * Filtra por el producto que querramos eliminar y actualiza
   */

  async deleteProduct(){
        const db = getFirestore();
        const collectionReference = doc(db, "Stock", "stock");
        let deleteProduct : any 
        deleteProduct = this.productDetail.filter(
          ((data: { prenda: any; marca: any; talle: any; precio: any; })  => 
            data.prenda !=  this.productDetailId.prenda ||
            data.marca !=  this.productDetailId.marca ||
            data.talle !=  this.productDetailId.talle  ||
            data.precio !=  this.productDetailId.precio 
        ))
        await updateDoc(collectionReference, {
          productos: deleteProduct
      }); 
      this.router.navigate(['/products']);
  }

  /**
   * Esta funcion actualiza el precio de nuestro producto
   * Filtra por el producto que querramos actualizar y cambio el valor del campo
   * ESto se realiza a traves del objeto updateProduct
   */

  async updateProduct(){
    const db = getFirestore();
    const collectionReference = doc(db, "Stock", "stock");
    let updateProduct = {
      id :this.productDetailId.id,
      prenda: this.productDetailId.prenda,
      marca: this.productDetailId.marca,
      talle: this.productDetailId.talle,
      precio: this.selectedPrice,
      stock: this.productDetailId.stock,
    }
    let positionProduct = parseFloat(this.routeParams)
    this.productDetail.splice(positionProduct, 1, updateProduct);
    await updateDoc(collectionReference, {
      productos:   this.productDetail
    }); 
    this.getCollection() 
  }

   /**
   * Esta funcion actualiza el stock de nuestro producto
   * Filtra por el producto que querramos actualizar y cambio el valor del campo
   * ESto se realiza a traves del objeto updateProduct
   */


  async updateStock(){
    const db = getFirestore();
    const collectionReference = doc(db, "Stock", "stock");
    let updateProduct = {
      id :this.productDetailId.id,
      prenda: this.productDetailId.prenda,
      marca: this.productDetailId.marca,
      talle: this.productDetailId.talle,
      precio: this.productDetailId.precio,
      stock :this.selectedStock
    }
    let positionProduct = parseFloat(this.routeParams)
    this.productDetail.splice(positionProduct, 1, updateProduct);
    await updateDoc(collectionReference, {
      productos:   this.productDetail
    }); 
    this.getCollection() 
  }

  /**
   * Esta funcion nos redirige a la vista de Menu
   */

  toMenu(){
    this.router.navigate(['/menu']);
  }

  /**
   * Esta funcion nos redirige a la vista de anterior
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
