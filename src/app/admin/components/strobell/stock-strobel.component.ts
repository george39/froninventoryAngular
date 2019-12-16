import { Component, OnInit } from '@angular/core';
import {Strobell } from 'src/app/models/strobell';
import {StrobellService } from '../../../services/strobell.service';

@Component({
  selector: 'app-stock-strobel',
  templateUrl: './stock-strobel.component.html'

})
export class StockStrobelComponent implements OnInit {
  public title;
  public strobell: Strobell[];
  public busqueda;
  public consolidadoStrobell = [];

  constructor(
    private strobellService: StrobellService
  ) {
    this.title = 'Lisatdo strobell';
   }

  ngOnInit() {
    this.getStrobell();
  }

  getStrobell() {
    this.strobellService.getStrobells().subscribe(
      response => {
        if (!response.strobell) {

        } else {
          response.strobell.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoStrobell.push(consolidado);
            });
          });
          this.strobell = this.consolidadoStrobell;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
