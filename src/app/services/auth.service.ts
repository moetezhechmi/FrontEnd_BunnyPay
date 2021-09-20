import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Product} from '../models/product.model';
import {Trader} from '../models/Trader';
import {PipeDecoratorHandler} from '@angular/compiler-cli/src/ngtsc/annotations';

const baseUrl2 = 'http://localhost:3000/traders/signInTrader';
const baseUrl = 'http://localhost:3000/traders/signUpTrader';
const baseUrl3 = 'http://localhost:3000/traders/signup';

const UrlUpdateTrader = 'http://localhost:3000/traders/updateTrader';
const Urlgetrader = 'http://localhost:3000/traders/getTraderById';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private profiles: Trader[] = [];
  private profiles$ = new Subject<Trader[]>();

  constructor(private http: HttpClient) { }



  SignIn(data: any): Observable<any> {
    return this.http.post(baseUrl2, data);
  }

  SignUp(data: any): Observable<any> {
    return this.http.post(baseUrl3, data);
  }

  UpdateTrader(data: any): Observable<any> {
    return this.http.post(UrlUpdateTrader, data);
  }
  getTrader(data: any): Observable<any> {
    return this.http.post(Urlgetrader, data);
  }


  signupimage(Email: string, Firstname: string, Lastname: string, Phone: string, Password: string, imagee: string): void {
    const data = {
      firstname: Firstname,
      email: Email,
      lastname: Lastname,
      phone: Phone,
      password: Password,
      image: imagee
    };
    this.http
      .post<{ trader: Trader }>('http://localhost:3000/traders/signUpTraderImage', data)
      .subscribe((profileData) => {
        const trader: Trader = {
          firstname: Firstname,
        };
        this.profiles.push(trader);
        this.profiles$.next(this.profiles);
      });
  }

}
