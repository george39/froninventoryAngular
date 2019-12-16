import { Component, OnInit } from '@angular/core';
import { Ojaleteado } from 'src/app/models/ojaleteado';
import { OjaleteadoService } from '../../../services/ojaleteado.service';

@Component({
  selector: 'app-stock-ojaleteado',
  templateUrl: './stock-ojaleteado.component.html'

})
export class StockOjaleteadoComponent implements OnInit {
  public title;
  public ojaleteado: Ojaleteado[];
  public busqueda;
  public consolidadoOjaleteado = [];

  constructor(
    private ojaleteadoService: OjaleteadoService
  ) {
    this.title = 'Listado ojaleteado';
   }

  ngOnInit() {
    this.getOjaleteado();
  }

  getOjaleteado() {
    this.ojaleteadoService.getOjaleteados().subscribe(
      response => {
        if (!response.ojaleteado) {

        } else {
          response.ojaleteado.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoOjaleteado.push(consolidado);
            });
          });
          this.ojaleteado = this.consolidadoOjaleteado;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
