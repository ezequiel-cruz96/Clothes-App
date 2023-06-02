import { Component, OnInit } from '@angular/core';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public autho: Auth) {}

  ngOnInit() {}

  inputUser: string = '';

  inputPassword: string = '';

  errors: string = '';

  login() {
    signInWithEmailAndPassword(this.autho, this.inputUser, this.inputPassword)
      .then(() => {
        this.errors = 'Login exitoso';
      })
      .catch((err) => {
        this.errors = err.message;
      });
  }
}
