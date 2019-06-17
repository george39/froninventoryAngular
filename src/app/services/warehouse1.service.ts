import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class Warehouse1Service{
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	addWarehouse1(token, warehouse1): Observable<any>{
		let params = JSON.stringify(warehouse1);
		let headers = new HttpHeaders({'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.post(this.url + 'add-register', params, {headers: headers});
	}

	getWarehouses1(): Observable<any>{
		return this._http.get(this.url+'getwarehouses1').pipe(map(response => response));
	}

	getWarehouse1(id): Observable<any>{
		return this._http.get(this.url+'getwarehouse1/'+id).pipe(map(response => response));
	}

	todoWarehouse1(id): Observable<any>{
		return this._http.get(this.url+'buscar/'+id).pipe(map(response => response));
	}

}	