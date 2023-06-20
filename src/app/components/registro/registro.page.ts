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

  ngOnInit() {
  }

  validateField = false

  emailRegister: string = '';

  passwordRegister: string = ''

  registerUser() {
    createUserWithEmailAndPassword(this.auth, this.emailRegister, this.passwordRegister)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.presentAlert(error)
        console.log(error.message)
      });
  }

    async presentAlert(error : any) {
    const alert = await this.alertController.create({
      message: error.message,   
    });
    await alert.present();
  }

  validate(){
    if(this.emailRegister){
      this.validateEmail(this.emailRegister) ? this.validateField = false :this.validateField = true
    }
  }

  validateEmail (emailRegister: any)  {
    return emailRegister.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  toLogin(){
    this.router.navigate(['/login']);
  }

}
