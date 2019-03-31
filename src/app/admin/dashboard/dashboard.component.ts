import { Component, OnInit } from '@angular/core';
import { HereService } from '../../services/here.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public query: string;
  public position: string;
  public locations: Array<any>;
  direcciones = [
    {
      nombre: 'Tienda 1',
      dir: 'Av Lopez Portillo Region 98 1168 Cancun'
    },
    {
      nombre: 'Tienda 2',
      dir: 'Av Javier Rojo Gomez Manzana 20 Puerto Morelos'
    },
    {
      nombre: 'Tienda 3',
      dir: 'Cancun'
    }
  ];

  public constructor(private here: HereService) {
    // this.query = 'Tracy, CA';
    // this.position = '37.7397,-121.4252';
  }

  ngOnInit() {
    console.log(this.direcciones);
    this.direcciones = [
      {
        nombre: 'Tienda 1',
        dir: 'Av Lopez Portillo Region 98 1168 Cancun'
      },
      {
        nombre: 'Tienda 2',
        dir: 'Av Javier Rojo Gomez Manzana 20 Puerto Morelos'
      },
      {
        nombre: 'Tienda 3',
        dir: 'Cancun'
      }
    ];

  }

  public getAddress() {
    if (this.query !== '') {
      this.here.getAddress(this.query).then(result => {
        this.locations = <Array<any>>result;
        console.log(this.locations);
      }, error => {
        console.error(error);
      });
    }
  }

  public getAddress2(query) {
    if (query !== '') {
      this.here.getAddress(query).then(result => {
        this.locations = <Array<any>>result;
        console.log(this.locations);
      }, error => {
        console.error(error);
      });
    }
  }

  public getAddressFromLatLng() {
    if (this.position !== '') {
      this.here.getAddressFromLatLng(this.position).then(result => {
        this.locations = <Array<any>>result;
      }, error => {
        console.error(error);
      });
    }
  }

}
