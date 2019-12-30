import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VulcanizadoService {
  public url: string;

  constructor(private http: HttpClient) {
      this.url = GLOBAL.url;
   }


  // ================================================
   // GUARDAR UNA UNIDAD EN VULCANIZADO
   // ================================================
   addVulcanizado(token, vulcanizado): Observable<any> {
    const params = JSON.stringify(vulcanizado);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.post(this.url + 'addvulcanizado', params, {headers});
  }


   // ================================================
  // ELIMINAR UNA UNIDAD EN VULCANIZADO
  // ================================================
  updateVulcanizado(token, vulcanizado): Observable<any> {
    const params = JSON.stringify(vulcanizado);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'delete-item-vulcanizado', params, {headers});
  }


  // ================================================
  // LISTAR LAS COLECCIONES DE VULCANIZADO
  // ================================================
  getVulcanizados(): Observable<any> {
    return this.http.get(this.url + 'getvulcanizado').pipe(map(response => response));
  }


  // ================================================
  // ELIMINAR UNA COLECCION DE VULCANIZADO
  // ================================================
  deleteVulcanizado(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.delete(this.url + 'deletevulcanizado/' + id, {headers});
  }
}
