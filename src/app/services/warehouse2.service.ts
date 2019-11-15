import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Warehouse2Service {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

  // ================================================
   // GUARDAR UNA UNIDAD EN WAREHOUSE 2
   // ================================================
   addWarehouse2(token, warehouse2): Observable<any> {
    const params = JSON.stringify(warehouse2);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.post(this.url + 'addwarehouse2', params, {headers});
  }


  // ================================================
  // ELIMINAR UNA UNIDAD EN WAREHOUSE 2
  // ================================================
  updateWarehouse2(token, warehouse2): Observable<any> {
    const params = JSON.stringify(warehouse2);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'delete-item-warehouse2', params, {headers});
  }


  // ================================================
  // LISTAR LAS COLECCIONES DE WAREHOUSE 2
  // ================================================
  getWarehouses2(): Observable<any> {
    return this.http.get(this.url + 'getwarehouses2').pipe(map(response => response));
  }


  // ================================================
  // ELIMINAR UNA COLECCION DE WAREHOUSE 2
  // ================================================
  deleteWarehouse2(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.delete(this.url + 'deletewarehouse2/' + id, {headers});
  }
}
