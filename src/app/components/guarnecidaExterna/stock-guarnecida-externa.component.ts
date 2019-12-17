import { Component, OnInit } from '@angular/core';

import { GuarnecidaExterna } from 'src/app/models/guarnecida-externa';
import { GuarnecidaExternaService } from '../../services/guarnecida-externa.service';


@Component({
  selector: 'app-stock-guarnecida-externa',
  templateUrl: './stock-guarnecida-externa.component.html'
  
})
export class StockGuarnecidaExternaComponent implements OnInit {
  public title;
  public guarnecidaExterna: GuarnecidaExterna[];
  public busqueda;
  public consolidadoGuarnecida = [];

  constructor(
    private guarnecidaService: GuarnecidaExternaService
  ) {
    this.title = 'Listado guarnecida externa';
   }

  ngOnInit() {
    this.getGuarnecida();
  }

  getGuarnecida() {
    this.guarnecidaService.getGuarnecidasExterna().subscribe(
      response => {
        if (!response.guarnecidaExterna) {

        } else {
          // this.consolidadoGuarnecida = [];
          response.guarnecidaExterna.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoGuarnecida.push(consolidado);
            });
          });

          this.guarnecidaExterna = this.consolidadoGuarnecida;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}


