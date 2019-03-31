import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Cliente } from '../interfaces/cliente';

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
    this.locationsRef = this.db.list('clientes/');
    return this.locationsRef;

  }

  getCustumer(id) {
    return this.locationRef = this.db.object('clientes/' + id);
  }


}
