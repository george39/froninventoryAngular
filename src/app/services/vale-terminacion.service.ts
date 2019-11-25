import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValeTerminacionService {

  public url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

  // ================================================
   // GUARDAR UNA UNIDAD EN VALE TERMINADO
   // ================================================
   addValeTerminado(token, valeTerminado): Observable<any> {
    const params = JSON.stringify(valeTerminado);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.post(this.url + 'addvale-termination', params, {headers});
  }


  // ================================================
  // ELIMINAR UNA UNIDAD EN VALE TERMINADO
  // ================================================
  updateValeTerminado(token, valeTerminado): Observable<any> {
    const params = JSON.stringify(valeTerminado);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'delete-item-valetermination', params, {headers});
  }


  // ================================================
  // LISTAR LAS COLECCIONES DE VALE TERMINADO
  // ================================================
  getValeTerminados(): Observable<any> {
    return this.http.get(this.url + 'getvales-termination').pipe(map(response => response));
  }


  // ================================================
  // LISTA UNA TAREA ESPECIFICA DE TERMINACION 
  // ================================================
  getValeTerminado(id): Observable<any> {
		return this.http.get(this.url + 'getvale-termination/' + id).pipe(map(response => response));
	}


  // ================================================
  // ELIMINAR UNA COLECCION DE VALE TERMINADO
  // ================================================
  deleteValeTerminado(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.delete(this.url + 'deletevale-termination/' + id, {headers});
  }
}
