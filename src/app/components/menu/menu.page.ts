import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Auth, signOut} from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    public router :Router,
    private auth: Auth
    ) {}

  ngOnInit() {
  }

  /**
   * Esta funcion nos redirige a la vista de Liquidaciones
   */

  toLiquidations(){
    this.router.navigate(['/liquidations']);
  }

  /**
   * Esta funcion nos redirige a la vista de Productos
   */

  toProducts(){
    this.router.navigate(['/products']);
  }

  /**
   * Esta fnos deslogea a traves de  la funcion signOut de firebase
   * Una vez deslogados nos redirije a la vista de Login
   */

  toLogout(){
    signOut(this.auth);
    this.router.navigate(['/login']);
  }

    /**
   * Esta fnos deslogea a traves de  la funcion signOut de firebase
   * Una vez deslogados nos redirije a la vista de Login
   */

  toSearch(){
    this.router.navigate(['/search'])
  }

}
