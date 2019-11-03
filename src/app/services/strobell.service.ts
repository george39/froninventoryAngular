import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StrobellService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }


  // ================================================
   // GUARDAR UNA UNIDAD EN STROBELL
   // ================================================
   addStrobell(token, strobell): Observable<any> {
    const params = JSON.stringify(strobell);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.post(this.url + 'addstrobell', params, {headers});
  }


  // ================================================
  // ELIMINAR UNA UNIDAD EN STROBELL
  // ================================================
  updateStrobell(token, strobell): Observable<any> {
    const params = JSON.stringify(strobell);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'delete-item-strobell', params, {headers});
  }


  // ================================================
  // LISTAR LAS COLECCIONES DE STROBELL
  // ================================================
  getStrobells(): Observable<any> {
    return this.http.get(this.url + 'getstrobell').pipe(map(response => response));
  }


  // ================================================
  // ELIMINAR UNA COLECCION DE STROBELL
  // ================================================
  deleteStrobell(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.delete(this.url + 'deletestrobell/' + id, {headers});
  }
}
