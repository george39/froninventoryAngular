import { Component, OnInit } from '@angular/core';
import { Guarnecida } from 'src/app/models/guarnecida';
import { GuarnecidaService } from '../../../services/guarnecida.service';

@Component({
  selector: 'app-stock-guarnecida',
  templateUrl: './stock-guarnecida.component.html'
  
})
export class StockGuarnecidaComponent implements OnInit {
  public title;
  public guarnecida: Guarnecida[];
  public busqueda;

  constructor(
    private guarnecidaService: GuarnecidaService
  ) { }

  ngOnInit() {
    this.getGuarnecida();
  }

  getGuarnecida() {
    this.guarnecidaService.getGuarnecidas().subscribe(
      response => {
        if (!response.guarnecida) {

        } else {
          this.guarnecida = response.guarnecida;
          console.log('almacen ', this.guarnecida);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
