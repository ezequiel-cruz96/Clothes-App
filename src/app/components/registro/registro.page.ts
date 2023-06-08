import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  constructor(
    public router: Router,
    private auth: Auth,
    private alertController: AlertController
    ) {}

  ngOnInit() {}

  registerUser() {
    createUserWithEmailAndPassword(this.auth, this.emailRegister, this.passwordRegister)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.presentAlert(err)
      });
  }

    async presentAlert(err :string) {

    let errorFirebase="Firebase: Password should be at least 6 characters (auth/weak-password)"

    let errors = err != errorFirebase ? "El correo ya esta registrado" : ""

    const alert = await this.alertController.create({
      message: errors,   
    });
    await alert.present();
  }

   validate(){
    if(this.emailRegister){
       this.validateEmail(this.emailRegister) ? this.validateField = false :this.validateField = true
    }
  }

   validateEmail (inputUser: any)  {
    return inputUser.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  
  validateField=false

  emailRegister: string = '';

  passwordRegister: string = '';

}
