import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  direcciones = [
    {
      dir: 'Av Tulum Cancun'
    },
    {
      dir: 'Av Andres Quintana Roo Cancun'
    },
    {
      dir: 'Av Portillo Region 98'
    }
  ];
  location: Location;
  loading: boolean;
  markers: Array<any> = [];
  locations: any[] = [];
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
      data.forEach(item => {
        this.setArreglo(item);
      });
    });


    console.log(this.locations);
  }


  setArreglo(data) {
    this.locations.push(data);
    console.log(this.locations);
    this.showLocation();
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
          this.markers.push(this.location);
          console.log(this.markers);
          this.loading = false;
          this.ref.detectChanges();
        }
        );
    });
  }

}
