import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuarnecidaService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   addGuarnecida(token, guarnecida): Observable<any> {
     const params = JSON.stringify(guarnecida);
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.post(this.url + 'guarnecida-interna', params, {headers});
   }

   updateGuarnecida(token, guarnecida): Observable<any> {
		const params = JSON.stringify(guarnecida);
		const headers = new HttpHeaders({'Content-Type': 'application/json',
			Authorization: token
		});

    return this.http.put(this.url + 'deleteItem/', params, { headers});
  }

  getGuarnecidas(): Observable<any>{
		return this.http.get(this.url + 'getguarnecidas').pipe(map(response => response));
	}
	
}