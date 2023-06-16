import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prendas =['Remera','Pantalon','Camisa','Campera'];

  talles =['S','M','L','XL'];

  marcas =['Adidas','Nike','L','XL'];

  selecTedTalle: string = ""

  selecTedPrenda: string = ""

  selecTedMarca: string = ""

}
