import { Component } from '@angular/core';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(public autho: Auth) {}

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
