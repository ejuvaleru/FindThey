import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from '../../services/geocodeservice.service';
import { Location } from '../../interfaces/location';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/interfaces/cliente';


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

}
