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


  ngOnInit() {}

  inputUser: string = '';

  inputPassword: string = '';

  errors: string = '';

  login() {
    signInWithEmailAndPassword(this.autho, this.inputUser, this.inputPassword)
      .then(() => {
        this.router.navigate(['/menu']);
      })
      .catch((err) => {
        let mailError :string ="Firebase: Error (auth/invalid-email)."
        if(err.message === mailError){
          this.presentAlert("mail")
        } else{
          this.presentAlert("password")
        }
      });
  }

  registerGoogle(){
    const auth :any = getAuth();
    linkWithPopup(auth.currentUser, provider)
    .then(() => {
      this.router.navigate(['/menu']);
    }).catch((error) => {
     console.log(error)
    });
  }

  validateField=false

  validate(){
    if(this.inputUser){
       this.validateEmail(this.inputUser) ? this.validateField = false :this.validateField = true
    }
  }


   validateEmail (inputUser: any)  {
    return inputUser.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  async presentAlert(error :string) {
    let errors =error==="mail"? "Mail incorrecto / Campo vacio" : "Password incorrecto / Campo vacio"
    const alert = await this.alertController.create({
      message: errors,   
    });
    await alert.present();
  }

  toRegister(){
    this.router.navigate(['/register']);
  }

}
