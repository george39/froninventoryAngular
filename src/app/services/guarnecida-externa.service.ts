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

   addGuarnecida(token, guarnecida): Observable<any> {
     const params = JSON.stringify(guarnecida);
     const headers = new HttpHeaders({'Content-Type': 'application/json',
           Authorization: token});

     return this.http.post(this.url + 'guarnecida-externa', params, {headers});
   }

   updateGuarnecida(token, guarnecida): Observable<any> {
		const params = JSON.stringify(guarnecida);
		const headers = new HttpHeaders({'Content-Type': 'application/json',
			Authorization: token
		});

  return this.http.put(this.url + 'deleteitem-externa/', params, { headers});
  }

  getGuarnecidas(): Observable<any> {
   return this.http.get(this.url + 'getguarnecida-externa').pipe(map(response => response));
  }

  deleteGuarnecida(token, id): Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

	 return this.http.delete(this.url + 'deleteguarnecida-externa/' + id, {headers});
  }
}
