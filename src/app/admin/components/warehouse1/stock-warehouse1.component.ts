import { Component, OnInit } from '@angular/core';
import { Warehouse1 } from 'src/app/models/warehouse1';
import { Warehouse1Service } from '../../../services/warehouse1.service';

@Component({
  selector: 'app-stock-warehouse1',
  templateUrl: './stock-warehouse1.component.html'
  
})
export class StockWarehouse1Component implements OnInit {
  public title;
  public warehouse1: Warehouse1[];
  public busqueda;

  constructor(
    private warehouse1Service: Warehouse1Service
  ) { }

  ngOnInit() {
    this.getWarehouse1();
  }

  getWarehouse1() {
    this.warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {

        } else {
          this.warehouse1 = response.warehouse1;
          console.log('almacen ', this.warehouse1);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
