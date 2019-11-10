import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuarnecidaExternaService {

  public url: string;

  constructor(
    private http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }


   // ================================================
   // GUARDAR UNA UNIDAD EN GUARNECIDA EXTERNA
   // ================================================
   addGuarnecida(token, guarnecida): Observable<any> {
    const params = JSON.stringify(guarnecida);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.post(this.url + 'addguarnecida-externa', params, {headers});
  }


  // ================================================
  // ELIMINAR UNA UNIDAD EN GUARNECIDA EXTERNA
  // ================================================
  updateGuarnecidaExterna(token, guarnecida): Observable<any> {
    const params = JSON.stringify(guarnecida);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'delete-item-externa', params, {headers});
  }


  // ================================================
  // LISTAR LAS COLECCIONES DE GUARNECIDA EXTERNA
  // ================================================
  getGuarnecidasExterna(): Observable<any> {
    return this.http.get(this.url + 'getguarnecida-externa').pipe(map(response => response));
  }

 


  // ================================================
  // ELIMINAR UNA COLECCION DE GUARNECIDA EXTERNA
  // ================================================
  deleteGuarnecidaExterna(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.delete(this.url + 'deleteguarnecida-externa/' + id, {headers});
  }
}
