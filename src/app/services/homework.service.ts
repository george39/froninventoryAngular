import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeworkService{
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	addHomework(token, homework): Observable<any>{
		let params = JSON.stringify(homework);
		let headers = new HttpHeaders({'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.post(this.url+'homework', params, {headers: headers});
	}

	getHomeworks(): Observable<any>{
		return this._http.get(this.url+'gethomeworks').pipe(map(response => response));
	}

	getHomework(id): Observable<any>{
		return this._http.get(this.url+'gethomework/'+id).pipe(map(response => response));
	}

	editHomework(token, id, homework): Observable<any>{
		let params = JSON.stringify(homework);
		let headers = new HttpHeaders({'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.put(this.url+'update-homework/'+id, params, {headers: headers});
	}

	deleteHomework(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

	return this._http.delete(this.url+'delete-homework/'+id, {headers: headers});								   
	}
}