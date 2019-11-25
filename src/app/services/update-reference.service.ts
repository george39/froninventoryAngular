import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateReferenceService {
  public url;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   updateReference(token, warehouse2): Observable<any> {
    const params = JSON.stringify(warehouse2);
    const headers = new HttpHeaders({'Content-Type': 'application/json',
          Authorization: token});

    return this.http.put(this.url + 'updatereference-warehouse2', params, {headers});
  }
}
