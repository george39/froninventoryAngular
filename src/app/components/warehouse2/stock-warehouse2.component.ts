import { Component, OnInit } from '@angular/core';
import { Warehouse2 } from 'src/app/models/warehouse2';
import { Warehouse2Service } from '../../services/warehouse2.service';

@Component({
  selector: 'app-stock-warehouse2',
  templateUrl: './stock-warehouse2.component.html',
  styles: []
})
export class StockWarehouse2Component implements OnInit {
  public title;
  public warehouse2: Warehouse2[];
  public busqueda;
  public consolidadoWarehouse2 = [];

  constructor(
    private warehouse2Service: Warehouse2Service
  ) {
    this.title = 'Listado almacen 2';
   }

  ngOnInit() {
    this.getWarehouse2();
  }

  getWarehouse2() {
    this.warehouse2Service.getWarehouses2().subscribe(
      response => {
        if (!response.warehouse2) {

        } else {
          response.warehouse2.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoWarehouse2.push(consolidado);
            });
          });
          this.warehouse2 = this.consolidadoWarehouse2;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
