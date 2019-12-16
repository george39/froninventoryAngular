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
  public consolidadoWarehouse1 = [];

  constructor(
    private warehouse1Service: Warehouse1Service
  ) {
    this.title = 'Listado almacen 1';
   }

  ngOnInit() {
    this.getWarehouse1();
  }

  getWarehouse1() {
    this.warehouse1Service.getWarehouses1().subscribe(
      response => {
        if (!response.warehouse1) {

        } else {
          response.warehouse1.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoWarehouse1.push(consolidado);
            });
          });
          this.warehouse1 = this.consolidadoWarehouse1;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
