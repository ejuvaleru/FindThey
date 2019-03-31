import { Component, OnInit } from '@angular/core';
import { HereService } from '../../services/here.service';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  locations: any[] = [];
  constructor(public api: ClientesService) {

  }

  ngOnInit(): void {
    const t = this.api.getCoustumers();
    t.snapshotChanges().subscribe(data => {
      this.setArreglo(data);
      data.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.locations.push(a);
      });
    });
console.log(this.locations);
  }


setArreglo(data) {
  this.locations.push(data);
}

}
