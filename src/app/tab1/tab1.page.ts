import { Component } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {}

  inputUser: string = '';

  inputPassword: string = '';

  test() {
    console.log(this.inputUser);
    console.log(this.inputPassword);
  }
}
