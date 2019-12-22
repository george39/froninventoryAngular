import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';

@Injectable()
export class ReferenceService{
	public url: string;
	

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	addReference(token, reference): Observable<any>{
		let params = JSON.stringify(reference);
		let headers = new HttpHeaders({'Content-Type': 'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'save-reference', params, {headers});

	}

	getReferences(): Observable<any>{
		return this._http.get(this.url + 'references').pipe(map(response => response));
	}
}	