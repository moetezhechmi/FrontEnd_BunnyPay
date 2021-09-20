import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:3000/traders/email-activate';


@Injectable({
  providedIn: 'root'
})
export class ValidationaccountService {

  constructor(private http: HttpClient) { }


  validateaccount(token: string): Observable<any> {
    return this.http.post(baseUrl, token);
  }
}
