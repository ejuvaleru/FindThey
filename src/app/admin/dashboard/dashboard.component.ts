import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from '../../services/geocodeservice.service';
import { Location } from '../../interfaces/location';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { google } from '@agm/core/services/google-maps-types';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  address = '';
  nombre = '';
  direcciones = [
    {
      nom: 'Tiendita 1',
      dir: 'Av Tulum Cancun'
    },
    {
      nom: 'Tiendita 2',
      dir: 'Av Andres Quintana Roo Cancun'
    },
    {
      nom: 'Tiendita 3',
      dir: 'Av Portillo Region 98'
    }
  ];
  lat: any;
  lng: any;

  nombreC: string;
  dirC: string;
  nombreTiC: string;
  tipo: number;
  //////////////
  location: Location;
  loading: boolean;
  clientes: any[] = [];
  markers: Array<any> = [];
  locations: any[] = [];
  names: any[] = [];
  service: any;
  map: any = '';

  nerbyPlaces = [
  // tslint:disable-next-line:max-line-length
  { lat: 21.031040, lng: -89.570347, nombre: 'La Lupita', tipo: 1, img: '../../../assets/img/shop.png' },
  // tslint:disable-next-line:max-line-length
  { lat: 20.967787, lng: -89.623893, nombre: 'Restaurante Mérida', tipo: 2, img: '../../../assets/img/food.png' },
  // tslint:disable-next-line:max-line-length
  { lat: 20.966402, lng: -89.644232, nombre: 'Oxxo Jacinto', tipo: 3, img: '../../../assets/img/oxxo.png'},
  // tslint:disable-next-line:max-line-length
  { lat: 20.9808195, lng: -89.6523484, nombre: 'Oxxo P. Bojorquez', tipo: 3, img: '../../../assets/img/oxxo.png'},
  // tslint:disable-next-line:max-line-length
  { lat: 20.980874, lng: -89.6523494, nombre: 'Tienda Toli', tipo: 1, img: '../../../assets/img/shop.png' },
  // tslint:disable-next-line:max-line-length
  { lat: 20.9791661, lng: -89.6482172, nombre: 'Comida Corrida Yulisa', tipo: 2, img: '../../../assets/img/food.png' },
  // tslint:disable-next-line:max-line-length
  { lat: 20.9771477, lng: -89.6492974, nombre: 'Oxxo Calle 100', tipo: 3, img: '../../../assets/img/oxxo.png' },
  // tslint:disable-next-line:max-line-length
  { lat: 20.9768523, lng: -89.6494955, nombre: 'Minisuper Cuy', tipo: 1, img: '../../../assets/img/shop.png' },
  // tslint:disable-next-line:max-line-length
  { lat: 20.9791661, lng: -89.6482172, nombre: 'Antojitos Valeria', tipo: 2, img: '../../../assets/img/food.png'},
  // tslint:disable-next-line:max-line-length
  { lat: 20.978850, lng: -89.6498476, nombre: 'Antojitos doña lupe', tipo: 2, img: '../../../assets/img/food.png'},
    // tslint:disable-next-line:max-line-length
  { lat: 20.9701686, lng: -89.6503058, nombre: 'Tiendita doña lcha', tipo: 1, img: '../../../assets/img/shop.png' },
   // tslint:disable-next-line:max-line-length
   { lat: 20.9696591, lng: -89.6492828, nombre: 'Oxxo Calle 61A ', tipo: 3, img: '../../../assets/img/oxxo.png' },

  ];
  private cliente: Cliente;


  public constructor(
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
    private coustumersService: ClientesService,
    private api: ClientesService
  ) {
  }

  ngOnInit() {
    const t = this.api.getCoustumers();
    t.valueChanges().subscribe(data => {
      console.log('clientes', this.cliente);
      data.forEach(item => {
        this.setArreglo(item);
        this.clientes.push(item);
        console.log('itemes', item.nombre);
      });
    });

    console.log(this.locations);

    this.showLocation();

  }

  boton() {
    const t = this.api.getCoustumers();
    t.valueChanges().subscribe(data => {
      data.forEach(item => {
        this.setArreglo(item);
        console.log('el item', item);
      });
    });

    console.log(this.locations);
  }
  setArreglo(data) {
    this.locations.push(data);
    console.log(this.locations);

  }

  showLocation() {
    this.addressToCoordinates();
  }


  addressToCoordinates() {

    this.locations.forEach(item => {
      this.address = item.dir;
      this.loading = true;
      this.geocodeService.geocodeAddress(this.address)
        .subscribe((location: Location) => {
          this.location = location;
          if (this.location.lat !== 0 && this.location.lng !== 0) {
            this.markers.push({ location: this.location, nombre: item.nombre });
          }

          console.log(this.markers);
          this.loading = false;
          this.ref.detectChanges();
        }
        );
    });
  }

  addressToCoordinates2() {

    this.nerbyPlaces.forEach(item => {
      this.markers.push({ location: {lat: item.lat, lng: item.lng} , nombre: item.nombre });
      console.log(this.markers);
      this.loading = false;
      this.ref.detectChanges();
    });
  }

}


