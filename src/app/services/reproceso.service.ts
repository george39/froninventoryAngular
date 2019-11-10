import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReprocesoService {
  public url: string;

  constructor(
    private http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }



  // ================================================
   // GUARDAR UNA UNIDAD EN REPROCESO
   // ================================================
   addReproceso(token, reproceso): Observable<any> {
    const params = JSON.stringify(reproceso);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.post(this.url + 'addreproceso', params, {headers});
  }


  // ================================================
  // ELIMINAR UNA UNIDAD EN REPROCESO
  // ================================================
  updateReproceso(token, reproceso): Observable<any> {
    const params = JSON.stringify(reproceso);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'delete-item-reproceso', params, {headers});
  }


  // ================================================
  // LISTAR LAS COLECCIONES DE REPROCESO
  // ================================================
  getReproceso(): Observable<any> {
    return this.http.get(this.url + 'getreproceso').pipe(map(response => response));
  }


  // ================================================
  // ELIMINAR UNA COLECCION DE REPROCESO
  // ================================================
  deleteReproceso(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.delete(this.url + 'deletereproceso/' + id, {headers});
  }
}
