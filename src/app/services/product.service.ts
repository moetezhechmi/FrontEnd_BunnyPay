import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Shop} from '../models/shop.model';
import {Product} from '../models/product.model';
import {History} from '../models/history.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private profiles: Product[] = [];
  private profiles$ = new Subject<Product[]>();

  constructor(private http: HttpClient) { }
  addProdct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/traders/addProduct', data);
  }
  updateProdct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/traders/updateProduct', data);
  }
  getShopList(): Observable<Shop[]> {
    return this.http.get<Shop[]>('http://localhost:3000/traders/getShopsByTrader');
  }
  getHistoryList(): Observable<History[]> {
    return this.http.get<History[]>('http://localhost:3000/traders/traderhistory');
  }
  getProductList(data: any): Observable<Product[]> {
    return this.http.post<Product[]>('http://localhost:3000/traders/getProductsByShop', data);
  }
  deleteProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/traders/deleteProduct', data);
  }

  addProductfile(traderId: string, shopId: string, nom: string, prix: string, quantity: string, image: File, catego: string): void {
    const productData = new FormData();
    productData.append('name', nom);
    productData.append('price', prix);
    productData.append('quantite', quantity);
    productData.append('file', image);
    productData.append('category', catego);
    productData.append('ShopId', shopId);
    productData.append('TraderId', traderId);
    this.http
      .post<{ product: Product }>('http://localhost:3000/traders/addProduct', productData)
      .subscribe((profileData) => {
        const product: Product = {
          name: nom,
          price: prix,
          quantite: quantity,
          category: catego,
        };
        this.profiles.push(product);
        this.profiles$.next(this.profiles);
      });
  }
  updateProductfile( nom: string, prix: string, quantity: string, image: File): void {
    const productData = new FormData();
    productData.append('name', nom);
    productData.append('price', prix);
    productData.append('quantite', quantity);
    productData.append('file', image);
    this.http
      .post<{ product: Product }>('http://localhost:3000/traders/updateProduct', productData)
      .subscribe((profileData) => {
        const product: Product = {
          name: nom,
          price: prix,
          quantite: quantity,
        };
        console.log(product);
        this.profiles.push(product);
        this.profiles$.next(this.profiles);
      });
  }

}
