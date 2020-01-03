import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TroqueladoService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   addTroquelado(token, troquelado): Observable<any> {
     const params = JSON.stringify(troquelado);
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.post(this.url + 'troquelado', params, {headers});
   }

   // ================================================
  // LISTAR LAS COLECCIONES DE TERMINADO
  // ================================================
  getTroquelados(): Observable<any> {
    return this.http.get(this.url + 'gettroquelado').pipe(map(response => response));
  }

  // ================================================
  // ACTUALIZAR TROQUELADO
  // ================================================
  updateTareaUnidad(token, id, tareaUnidad): Observable<any> {
      const params = JSON.stringify(tareaUnidad);
      const headers = new HttpHeaders({'Content-Type': 'application/json',
        Authorization: token
  });

      return this.http.put(this.url + 'update-tarea-unidad/' + id, params, {headers});
	}
}
