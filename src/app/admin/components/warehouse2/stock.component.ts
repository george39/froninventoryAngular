import { Component, OnInit } from '@angular/core';
import { Warehouse2 } from 'src/app/models/warehouse2';
import { Warehouse2Service } from '../../../services/warehouse2.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styles: []
})
export class StockComponent implements OnInit {
  public title;
  public warehouse2: Warehouse2[];
  public busqueda;

  constructor(
    private warehouse2Service: Warehouse2Service
  ) { }

  ngOnInit() {
    this.getWarehouse2();
  }

  getWarehouse2() {
    this.warehouse2Service.getWarehouses2().subscribe(
      response => {
        if (!response.warehouse2) {

        } else {
          this.warehouse2 = response.warehouse2;
          console.log('almacen ', this.warehouse2);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
