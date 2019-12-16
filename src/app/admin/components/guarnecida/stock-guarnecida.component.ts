import { Component, OnInit } from '@angular/core';
import { Guarnecida } from 'src/app/models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';

@Component({
  selector: 'app-stock-guarnecida',
  templateUrl: './stock-guarnecida.component.html'
  
})
export class StockGuarnecidaComponent implements OnInit {
  public title;
  public guarnecidaInterna: Guarnecida[];
  public busqueda;
  public consolidadoGuarnecida = [];

  constructor(
    private guarnecidaService: GuarnecidaService
  ) { }

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
