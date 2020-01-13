import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../services/global';
import { Warehouse1 } from '../../models/warehouse1';
import { Warehouse2 } from '../../models/warehouse2';
import { Injection1 } from '../../models/injection1';
import { Guarnecida } from '../../models/guarnecida';
import { TareaUnidad } from '../../models/tareaUnidad';
import { GuarnecidaExterna } from '../../models/guarnecida-externa';
import { Ojaleteado } from '../../models/ojaleteado';
import { Strobell } from '../../models/strobell';
import { Termination } from '../../models/termination';
import { Reproceso } from '../../models/reproceso';
import { Vulcanizado } from 'src/app/models/vulcanizado';



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  tareaUnidad: TareaUnidad[] = [];
  guarnecidaInterna: Guarnecida[] = [];
  guarnecidaExterna: GuarnecidaExterna[] = [];
  warehouse1: Warehouse1[] = [];
  ojaleteado: Ojaleteado[] = [];
  strobell: Strobell[] = [];
  injection1: Injection1[] = [];
  warehouse2: Warehouse2[] = [];
  termination: Termination[] = [];
  reproceso: Reproceso[] = [];
  vulcanizado: Vulcanizado[] = [];

  public url: string;
  public titulo: string;
  public buscarPorTalla;
  public troquelado = [];
  public guarnInterna = [];
  public guarnExterna = [];
  public almacen1 = [];
  public ojaletead = [];
  public strobel = [];
  public inyeccion = [];
  public almacen2 = [];
  public terminacion = [];
  public reprocesoCJ = [];
  public vulca = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    // bublic router: Router,
  ) {
    this.titulo = 'Listado general de productos';
    this.url = GLOBAL.url;
    activatedRoute.params
      .subscribe(params => {
        const termino = params['termino'];
        this.buscar(termino);
        console.log(termino);
      });
   }

  ngOnInit() {
    
  }

  buscar(termino: string) {
    let url2 = this.url + 'busqueda/todo/' + termino;

    this.http.get(url2)
    .subscribe((resp: any) => {

      resp.tareaUnidad.forEach((item) => {
        if (termino === item.reference) {
          this.troquelado.push(item);
        }
      });


      resp.guarnecidaInterna.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.guarnInterna.push(todo);
          }
        });
      });

      resp.guarnecidaExterna.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.guarnExterna.push(todo);
          }
        });
      });

      resp.warehouse1.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.almacen1.push(todo);
          }
        });
      });

      resp.ojaleteado.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.ojaletead.push(todo);
          }
        });
      });

      resp.strobell.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.strobel.push(todo);
          }
        });
      });

      resp.injection1.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.inyeccion.push(todo);
          }
        });
      });

      resp.warehouse2.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.almacen2.push(todo);
          }
        });
      });

      resp.termination.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.terminacion.push(todo);
          }
        });
      });


      resp.reproceso.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.reprocesoCJ.push(todo);
          }
        });
      });

      resp.vulcanizado.forEach((item) => {
        item.registros.forEach((todo) => {
          if (termino === todo.reference) {

            this.vulca.push(todo);
          }
        });
      });


      this.tareaUnidad = this.troquelado;
      this.guarnecidaInterna = this.guarnInterna;
      this.guarnecidaExterna = this.guarnExterna;
      this.warehouse1 = this.almacen1;
      this.warehouse2 = this.almacen2;
      this.ojaleteado = this.ojaletead;
      this.strobell = this.strobel;
      this.injection1 = this.inyeccion;
      this.termination = this.terminacion;
      this.reproceso = this.reprocesoCJ;
      this.vulcanizado = this.vulca;

    });
    this.troquelado = [];
    this.guarnInterna = [];
    this.guarnExterna = [];
    this.almacen1 = [];
    this.almacen2 = [];
    this.ojaletead = [];
    this.strobel = [];
    this.inyeccion = [];
    this.terminacion = [];
    this.reprocesoCJ = [];
    this.vulca = [];
  }

}

