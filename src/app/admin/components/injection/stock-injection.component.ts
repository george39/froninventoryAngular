import { Component, OnInit } from '@angular/core';
import { Injection1 } from 'src/app/models/injection1';
import { Injection1Service } from '../../../services/injection1.service';

@Component({
  selector: 'app-stock-injection',
  templateUrl: './stock-injection.component.html'

})
export class StockInjectionComponent implements OnInit {
  public title;
  public injection: Injection1[];
  public busqueda;
  public consolidadoInjection1 = [];

  constructor(
    private injectionService: Injection1Service
  ) {
    this.title = 'Lisatdo injección';
   }

  ngOnInit() {
    this.getInjection1();
  }

  getInjection1() {
    this.injectionService.getInjections().subscribe(
      response => {
        if (!response.injection) {

        } else {
          response.injection.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoInjection1.push(consolidado);
            });
          });
          this.injection = this.consolidadoInjection1;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
