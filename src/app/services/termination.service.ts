import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TerminationService {
  public url: string;

  constructor(private http: HttpClient) {
      this.url = GLOBAL.url;
   }


  addTermination(token, termination): Observable<any> {
		const params = JSON.stringify(termination);
		const headers = new HttpHeaders({'Content-Type': 'application/json',
			Authorization: token
    });
  return this.http.post(this.url + 'addtermination', params, {headers});
	}
}
