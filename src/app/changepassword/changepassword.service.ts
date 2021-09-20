import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:3000/traders/reset-password';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http: HttpClient) { }


  resetPassword(obj: string, ): Observable<any> {
    return this.http.post(baseUrl, obj);
  }
}
