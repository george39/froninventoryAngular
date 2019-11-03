import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class Injection1Service {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   // ================================================
   // GUARDAR UNA UNIDAD EN INYECCION 1
   // ================================================
   addInjection1(token, injection1): Observable<any> {
     const params = JSON.stringify(injection1);
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.post(this.url + 'addinjection1', params, {headers});
   }


   // ================================================
   // ELIMINAR UNA UNIDAD EN INYECCION 1
   // ================================================
   updateInjection(token, injection1): Observable<any> {
     const params = JSON.stringify(injection1);
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.put(this.url + 'delete-item-injection1', params, {headers});
   }


   // ================================================
   // LISTAR LAS COLECCIONES DE INYECCION 1
   // ================================================
   getInjections(): Observable<any> {
     return this.http.get(this.url + 'getinjection1').pipe(map(response => response));
   }


   // ================================================
   // ELIMINAR UNA COLECCION DE INYECCIÓN 1
   // ================================================
   deleteInjection1(token, id): Observable<any> {
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.delete(this.url + 'deleteinjection1/' + id, {headers});
   }

}

