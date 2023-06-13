import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Auth , signOut} from '@angular/fire/auth';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    public router :Router,
    private auth: Auth
    ) { }

  ngOnInit() {
  }

  toLiquidations(){
    this.router.navigate(['/liquidations']);
  }

  toProducts(){
    this.router.navigate(['/products']);
  }

   toLogout(){
    signOut(this.auth);
    this.router.navigate(['/login']);
 }
}
