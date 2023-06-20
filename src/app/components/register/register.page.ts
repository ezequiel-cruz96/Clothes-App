import { Component, OnInit } from '@angular/core';

import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public router: Router,
    private auth: Auth,
    private alertController: AlertController
    ) {}

  ngOnInit() {
  }

  validateField = false

  emailRegister: string = '';

  passwordRegister: string = ''

  /**
   * Esta funcion nos permite registrar un usuario en Firebase
   * A traves de la funcion createUserWithEmailAndPassword podemos setear un mail y contraseña
   * Si hay algun error se muestra una alerta
   */

  registerUser() {
    createUserWithEmailAndPassword(this.auth, this.emailRegister, this.passwordRegister)
      .then(() => {
        this.emailRegister = ""
        this.passwordRegister = ""
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.presentAlert(error)
        console.log(error.message)
      });
  }

  /**
   * Esta funcion es una alerta que muestra los errores de Firebase
   */

  async presentAlert(error : any) {
  const alert = await this.alertController.create({
    message: error.message,   
  });
  await alert.present();
  }

  /**
   * Esta funcion valida si el formato mail es correcto
   * Si es correcto setea en true la variable validateField
   * Si es incorrecto setea en false la variable validateField
   * @param emailRegister 
   */

  validate(){
    if(this.emailRegister){
      this.validateEmail(this.emailRegister) ? this.validateField = false :this.validateField = true
    }
  }

  /**
   * Esta funcion es un regex que devuelve true si el formato ingresado es correcto
   * @param emailRegister 
   */

  validateEmail (emailRegister: any)  {
    return emailRegister.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  /**
   * Esta funcion nos redirige a la vista de Login
   */

  toLogin(){
    this.router.navigate(['/login']);
  }

}
