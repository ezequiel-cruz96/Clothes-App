import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { }


  getPlaces(){
    const placeRef = collection(this.firestore, 'Stock');
    console.log(placeRef)
    return collectionData(placeRef);
  }


}
