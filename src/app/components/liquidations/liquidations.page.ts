import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { HttpProvider } from 'src/app/provider/http.provider';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-liquidations',
  templateUrl: './liquidations.page.html',
  styleUrls: ['./liquidations.page.scss'],
})
export class LiquidationsPage implements OnInit {

  constructor(
    public router:Router,
    public service: HttpProvider, 
    private location : Location,
    private alertController: AlertController

  ) {}

  ngOnInit() {
    this.getDolars()
  }

  dolarBlue: any

  dolars: any 

  /**
   * Esta funcion funcion obtiene los valores de los dolares de la querie
   * El resultado se guarda en la variable dolars
   */

  getDolars(){( 
    this.service.getTypesDolar()).subscribe(
    (data: any) => {  this.dolars = data},
    (error: any) => { this.presentAlert(error)}
    )
  }

  /**
   * Esta funcion nos redirige a la vista de productos
   */

  toProducts(){
    this.router.navigate(['/products'])
  }

  /**
   * Esta funcion nos redirige a la vista de Menu
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
