import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getCoustumers() {
    return this.http.get('https://findme-23ded.firebaseio.com/.json').subscribe(data =>
    console.log('Mostrando data: ', data));
  }
}
