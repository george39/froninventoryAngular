import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ViradoService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   // ================================================
   // GUARDAR UNA UNIDAD EN VIRADO
   // ================================================
   addVirado(token, virado): Observable<any> {
     const params = JSON.stringify(virado);
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.post(this.url + 'virado', params, {headers});
   }


   // ================================================
   // ELIMINAR UNA UNIDAD EN VIRADO
   // ================================================
   updateInVirado(token, virado): Observable<any> {
     const params = JSON.stringify(virado);
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.put(this.url + 'delete-item-virado', params, {headers});
   }


   // ================================================
   // LISTAR LAS COLECCIONES DE VIRADO
   // ================================================
   getVirados(): Observable<any> {
     return this.http.get(this.url + 'getvirado').pipe(map(response => response));
   }


   // ================================================
   // ELIMINAR UNA COLECCION DE INYECCIÓN 1
   // ================================================
   deleteVirado(token, id): Observable<any> {
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.delete(this.url + 'deletevirado/' + id, {headers});
   }

}

