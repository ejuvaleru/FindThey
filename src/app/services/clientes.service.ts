import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  locationsRef: AngularFireList<any>; // Referencia a una lista locations
  locationRef: AngularFireObject<any>; // Referencia a una dirección
  constructor(
    private db: AngularFireDatabase
  ) {

  }




  getCoustumers() {
    this.locationsRef = this.db.list('direcciones/');
    return this.locationsRef;

  }
}
