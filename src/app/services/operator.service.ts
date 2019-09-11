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


  getOperators(): Observable<any>{
		return this._http.get(this.url + 'getoperator').pipe(map(response => response));
	}
}
