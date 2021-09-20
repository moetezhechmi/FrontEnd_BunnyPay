import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


const baseUrl3 = 'http://localhost:3000/traders/forgot-password';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(email: string): Observable<any> {
    return this.http.post(baseUrl3, email);


  }

}
