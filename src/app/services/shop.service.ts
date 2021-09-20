import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Shop} from '../models/shop.model';

const baseUrl = 'http://localhost:3000/traders/addShop';
const baseUrl2 = 'http://localhost:3000/traders/getShopsByTrader';
const urldelete = 'http://localhost:3000/traders/deleteShop';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private profiless: Shop[] = [];
  private profiless$ = new Subject<Shop[]>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Shop[]> {
    return this.http.get<Shop[]>(baseUrl);
  }

  get(id: any): Observable<Shop> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  displayShop(data: any): Observable<any> {
    return this.http.post(baseUrl2, data);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteshop(data: any): Observable<any> {
    return this.http.post(urldelete, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }



  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${baseUrl}?title=${title}`);
  }
  addShopfile(nom: string, desc: string): void {
    const shopData = new FormData();
    shopData.append('name', nom);
    shopData.append('description', desc);
    this.http
      .post<{ shop: Shop }>('http://localhost:3000/traders/addShopfile', shopData)
      .subscribe((profileData) => {
        const shopp: Shop = {
          name: nom,
          description: desc
        };
        console.log(shopp);
        this.profiless.push(shopp);
        this.profiless$.next(this.profiless);
      });
  }

}
