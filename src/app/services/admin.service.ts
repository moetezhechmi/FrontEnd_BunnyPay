import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shop} from '../models/shop.model';
import {Child} from '../models/child.model';


const AcceptUrl = 'http://localhost:3000/traders/AcceptChild';
const AdhererUrl = 'http://localhost:3000/traders/AdhererTag';
const sendsms = 'http://localhost:3000/traders/sendsms';
const ListUrl = 'http://localhost:3000/traders/getChildrenAdmin';
const gettagwriteurl = 'http://pi@192.168.43.235:3500/tag/write';
const gettagreadurl = 'http://pi@192.168.43.235:3500/tag/read';
const RefuseUrl = 'http://localhost:3000/traders/RefuseChildAdmin';
const createTicketUrl = 'http://localhost:3000/traders/addTicket';
const ListTicket = 'http://localhost:3000/traders/getTicketsAdmin';
const addCommandUrl = 'http://localhost:3000/traders/addCommande';
const getyourtagurl = 'http://localhost:3000/traders/getYourTag';
const getchildbytagurl = 'http://localhost:3000/parents/getChildByTag';
const getchildsoldebytagurl = 'http://localhost:3000/parents/getChilSoldedByTag';
const updatesolde = 'http://localhost:3000/parents/updateSolde';




@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(ListUrl);
  }
  getTagWrite(): Observable<string> {
    return this.http.get<string>(gettagwriteurl);
  }
  getTagRead(): Observable<string> {
    return this.http.get<string>(gettagreadurl);
  }


  Accept(data: any): Observable<any> {
    return this.http.post(AcceptUrl, data);
  }
  sendsms(): Observable<any> {
    return this.http.get(sendsms);
  }


  Adherer(data: any): Observable<any> {
    return this.http.post(AdhererUrl, data);
  }
  getChildbyTag(data: any): Observable<any> {
    return this.http.post(getchildbytagurl, data);
  }
  getChildSoldebyTag(data: any): Observable<any> {
    return this.http.post(getchildsoldebytagurl, data);
  }
  updateSolde(data: any): Observable<any> {
    return this.http.post(updatesolde, data);
  }

  refuseChild(data: any): Observable<any> {
    return this.http.post(RefuseUrl, data);
  }
  getyourTag(data: any): Observable<any> {
    return this.http.post(getyourtagurl, data);
  }




  createTicket(data: any): Observable<any> {
    return this.http.post(createTicketUrl, data);
  }

  getTicket(data: any): Observable<any> {
    return this.http.post(ListTicket, data);
  }
  AddCommand(data: any): Observable<any> {
    return this.http.post(addCommandUrl, data);
  }

}
