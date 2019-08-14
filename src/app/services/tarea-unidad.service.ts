import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareaUnidadService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }


   addTareaUnidad(token, tareaunidad): Observable<any>{
		let params = JSON.stringify(tareaunidad);
		let headers = new HttpHeaders({'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.post(this.url + 'tareaunidad', params, {headers});
  }
  

  getHomeworkUnit(): Observable<any>{
		return this._http.get(this.url + 'gethomeworkunit').pipe(map(response => response));
	}
}
