import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OjaleteadoService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   // ================================================
   // GUARDAR UNA UNIDAD EN OJALETEADO
   // ================================================
   addOjaleteado(token, ojaleteado): Observable<any> {
    const params = JSON.stringify(ojaleteado);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.post(this.url + 'ojaleteado', params, {headers});
  }


  // ================================================
  // ELIMINAR UNA UNIDAD EN OJALETEADO
  // ================================================
  updateOjaleteado(token, ojaleteado): Observable<any> {
    const params = JSON.stringify(ojaleteado);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'delete-item-ojaleteado', params, {headers});
  }


  // ================================================
  // LISTAR LAS COLECCIONES DE OJALETEADO
  // ================================================
  getOjaleteados(): Observable<any> {
    return this.http.get(this.url + 'getojaleteado').pipe(map(response => response));
  }


  // ================================================
  // ELIMINAR UNA COLECCION DE OJALETEADO
  // ================================================
  deleteOjaleteado(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.delete(this.url + 'deleteojaleteado/' + id, {headers});
  }
	
}