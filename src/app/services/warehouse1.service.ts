import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class Warehouse1Service {
	public url: string;

	constructor(private _http: HttpClient) {
		this.url = GLOBAL.url;
	}

	addWarehouse1(token, warehouse1): Observable<any> {
		const params = JSON.stringify(warehouse1);
		const headers = new HttpHeaders({'Content-Type': 'application/json',
			Authorization: token
		});

		return this._http.post(this.url + 'add-register', params, {headers});
	}

	getWarehouses1(): Observable<any> {
		return this._http.get(this.url + 'getwarehouses1').pipe(map(response => response));
	}

	getWarehouse1(id): Observable<any> {
		return this._http.get(this.url + 'getwarehouse1/' + id).pipe(map(response => response));
	}

	todoWarehouse1(id): Observable<any> {
		return this._http.get(this.url + 'buscar/' + id).pipe(map(response => response));
	}

	buscarAlmacen(termino: string): Observable<any> {
		const url2 = GLOBAL.url + 'bus/coleccion/warehouse1/' + termino;
		return this._http.get(url2)
		           .pipe(map((resp: any) => resp.warehouse1));
	}

	updateWarehouse(token, warehouse1): Observable<any> {
		const params = JSON.stringify(warehouse1);
		const headers = new HttpHeaders({'Content-Type': 'application/json',
			Authorization: token
		});

		return this._http.put(this.url + 'updatewarehouse1/', params, { headers: headers});
	}

}
