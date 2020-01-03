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
  

  getHomeworksUnit(): Observable<any>{
		return this._http.get(this.url + 'gethomeworks-unit').pipe(map(response => response));
  }
  
  deleteTroquelado(token, id): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this._http.delete(this.url + 'deletehomeworkunit/' + id, {headers});
  }

  getHomeworkUnit(id): Observable<any>{
		return this._http.get(this.url + 'gethomework-unit/' + id).pipe(map(response => response));
  }
  
  updateHomeworkUnit(token, id, tareaUnidad): Observable<any>{
		let params = JSON.stringify(tareaUnidad);
		let headers = new HttpHeaders({'Content-Type': 'application/json',
			Authorization: token
		});

		return this._http.put(this.url + 'update-tarea-unidad/' + id, params, {headers});
	}
}
