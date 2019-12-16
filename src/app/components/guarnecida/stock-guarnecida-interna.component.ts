import { Component, OnInit } from '@angular/core';
import { Guarnecida } from 'src/app/models/guarnecida';
import { GuarnecidaService } from '../../services/guarnecida.service';


@Component({
  selector: 'app-stock-guarnecida-interna',
  templateUrl: './stock-guarnecida-interna.component.html'
  
})
export class StockGuarnecidaInternaComponent implements OnInit {
  public title;
  public guarnecidaInterna: Guarnecida[];
  public busqueda;
  public consolidadoGuarnecida = [];

  constructor(
    private guarnecidaService: GuarnecidaService
  ) {
    this.title = 'Listado guarnecida interna';
   }

  ngOnInit() {
    this.getGuarnecida();
  }

  getGuarnecida() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecidaInterna) {

        } else {
          // this.consolidadoGuarnecida = [];
          response.guarnecidaInterna.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoGuarnecida.push(consolidado);
            });
          });

          this.guarnecidaInterna = this.consolidadoGuarnecida;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}

