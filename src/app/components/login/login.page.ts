import { Component, OnInit } from '@angular/core';

import { getAuth,Auth, signInWithEmailAndPassword ,linkWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

const provider = new GoogleAuthProvider();

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public autho: Auth,
    public router: Router,
    private alertController: AlertController
    ) {}

  ngOnInit() {
  }

  inputUser: string = '';

  inputPassword: string = '';

  errors: string = '';

  validateField = false

  /**
   * El usuario inicia sesion usando su direccion de email y su contraseña
   * Utiliza la funcion signInWithEmailAndPassword que nos permite registrar en firebase
   * Parametros de la funcion signInWithEmailAndPassword  :
   * : @param inputUser @param inputPassword
   */

  login() {
    signInWithEmailAndPassword(this.autho, this.inputUser, this.inputPassword)
      .then(() => {
        this.inputUser = ""
        this.inputPassword = ""
        this.router.navigate(['/menu']);
      })
      .catch((err) => {
          this.presentAlert(err)
      });
  }

  /**
   * El usuario inicia sesion con su cuenta de google
   */

  registerGoogle(){
    const auth :any = getAuth();
    linkWithPopup(auth.currentUser, provider)
    .then(() => {
      this.router.navigate(['/menu']);
    }).catch((error) => {
      this.consoleAlert(error)
    });
  }

  /**
   * Esta funcion valida si el formato mail es correcto
   * Si es correcto setea en true la variable validateField
   * Si es incorrecto setea en false la variable validateField
   * @param inputUser 
   */

  validate(){
    if(this.inputUser){
      this.validateEmail(this.inputUser) ? this.validateField = false :this.validateField = true
    }
  }

  /**
   * Esta funcion es un regex que devuelve true si el formato ingresado es correcto
   * @param inputUser 
   */

  validateEmail (inputUser: any)  {
    return inputUser.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  /**
   * Esta funcion emite una alerta al recibir un mensaje de error
   * @param err 
   */

  async presentAlert(error : any) {
    var errorUser : any
    switch (error.message) {
      case "Firebase: Error (auth/user-not-found).": 
        errorUser = "Correo electrónico no existe"
        break;
        case "Firebase: Error (auth/wrong-password).": 
        errorUser = "La contraseña es incorrecta"
        break;
    }
    const alert = await this.alertController.create({
      message: errorUser,   
    });
    await alert.present();
  }

    /**
   * Esta funcion emite una alerta al recibir un mensaje de error
   * @param error
   */

    async consoleAlert(error : any) {
      const alert = await this.alertController.create({
        message: error.message,   
      });
      await alert.present();
    }

  /**
   * Esta funcion nos redirige a la vista de Registro
   */

  toRegister(){
    this.router.navigate(['/register']);
  }

}
