import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   // ================================================
   // GUARDAR UNA OPERARIO
   // ================================================
   addOperator(token, operator): Observable<any> {
    const params = JSON.stringify(operator);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this._http.post(this.url + 'operator', params, {headers});
  }


  getOperators(): Observable<any>{
		return this._http.get(this.url + 'getoperator').pipe(map(response => response));
	}
}
