import { Component, OnInit } from '@angular/core';
import { ValeTerminado } from '../../../models/valeTerminado';
import { ValeTerminacionService } from '../../../services/vale-terminacion.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-vale-terminado',
  templateUrl: './vale-terminado.component.html',
  styles: []
})
export class ValeTerminadoComponent implements OnInit {

  public valeTermination: ValeTerminado[];
  public status;
  public title: string;
  public busqueda;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private valeTerminadoService: ValeTerminacionService
  ) {
    this.title = 'LISTADO VALES TERMINADO';
    this.status = true;
   }

  ngOnInit() {
    this.getValeTerminado();
  }

  getValeTerminado() {
    this.valeTerminadoService.getValeTerminados().subscribe(
      response => {
        if (!response.valeTermination) {
          this.status = false;
        } else {
          this.valeTermination = response.valeTermination;
          console.log('vale', this.valeTermination);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
