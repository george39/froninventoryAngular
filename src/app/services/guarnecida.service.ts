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

  return this.http.put(this.url + 'deleteitem/', params, { headers});
  }

  getGuarnecidas(): Observable<any>{
   return this.http.get(this.url + 'getguarnecidas').pipe(map(response => response));
  }

  deleteGuarnecida(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

	 return this.http.delete(this.url + 'deleteguarnecida/' + id, {headers});
  }
  
  updateCanasta(token, id, guarnecida): Observable<any>{
		let params = JSON.stringify(guarnecida);
		let headers = new HttpHeaders({'Content-Type': 'application/json',
			'Authorization': token
		});

		return this.http.put(this.url + 'update-canasta/' + id, params, {headers});
	}
	
}