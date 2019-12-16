import { Component, OnInit } from '@angular/core';
import { Termination } from 'src/app/models/termination';
import { TerminationService } from '../../services/termination.service';

@Component({
  selector: 'app-stock-termination',
  templateUrl: './stock-termination.component.html'

})
export class StockTerminationComponent implements OnInit {
  public title;
  public termination: Termination[];
  public busqueda;
  public consolidadoTermination = [];

  constructor(
    private terminationService: TerminationService
  ) {
    this.title = 'Listado terminado';
   }

  ngOnInit() {
    this.getTermination();
  }

  getTermination() {
    this.terminationService.getTerminations().subscribe(
      response => {
        if (!response.termination) {

        } else {
          response.termination.forEach((item) => {
            item.registros.forEach((consolidado) => {
              this.consolidadoTermination.push(consolidado);
            });
          });
          this.termination = this.consolidadoTermination;

        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
