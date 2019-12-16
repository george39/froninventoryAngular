import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../../services/global';
import { Warehouse1 } from '../../../models/warehouse1';
import { Warehouse2 } from '../../../models/warehouse2';
import { Injection1 } from '../../../models/injection1';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  warehouse1: Warehouse1[] = [];
  warehouse2: Warehouse2[] = [];
  injection1: Injection1[] = [];

  public url: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    //bublic router: Router,
  ) {
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
          console.log(resp);
          this.warehouse1 = resp.warehouse1;
          this.warehouse2 = resp.warehouse2;
          this.injection1 = resp.injection1;
        });
  }

}
