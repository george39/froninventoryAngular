import { Component, OnInit } from '@angular/core';
import { TareaUnidadService } from '../../../services/tarea-unidad.service';
import { TareaUnidad } from '../../../models/tareaUnidad';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stock-troquelado',
  templateUrl: './stock-troquelado.component.html',
  styles: []
})
export class StockTroqueladoComponent implements OnInit {

  public title: string;
  public tareaUnidad: TareaUnidad[];
  public busqueda;

  constructor(
    private tareaUnidadService: TareaUnidadService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.title = 'Listado troquelado';
   }

  ngOnInit() {
    this.getTroquelado();
  }

  getTroquelado() {
    this.tareaUnidadService.getHomeworksUnit().subscribe(
      response => {
          this.tareaUnidad = response.tareaUnidad;
      },
      error => {
        console.log(error as any);
      }
    );
  }

}

