import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpProvider {

  constructor(public http: HttpClient) {
  }
   getTypesDolar() {
    let money = this.http.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    return money;
  }

}
