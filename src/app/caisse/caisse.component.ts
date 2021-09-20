import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {ShopService} from '../services/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Commande} from '../models/commande.model';
import Swal from 'sweetalert2';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit {

  product: Product = {
    _id: '',
    name: '',
    price: '',
    quantite: '',
    photo: '',
    shopname: '',
    shopId: '' ,
    traderId: '' ,
    q : 0 ,
    filtred : false,
  };
  commande: Commande = {
    _id: '',
    traderId: '',
    shop: '',
    products: '',
    quantites: '',
    child: '',
    total: '' ,

  };
  totalPrice = 0;
  loaded = true;
  qte = 1;
  exist = false;
  idTrader = localStorage.getItem('_id');
  products?: Product[];
  productsCard: Product[] = [];
  empty:boolean = true;
  stringJson: any;
  stringObject: any;
  pr: string = '';
  qteC: string = '';
  count: any;
  tagId: string = '';
  splitted: string = '';
  idchildcom: string = '';
  visible = false;
  visible2 = false;
  constructor(private productService: ProductService, private shopService: ShopService, private route: ActivatedRoute, private router: Router,  private adminService: AdminService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  boisson(){
    this.products?.map(obj => {
      if (obj.category == 'drinks'){
        obj.filtred = true;
      }else {
        obj.filtred = false;
      }
    });
  }
  all(){
    this.products?.map(obj => {
        obj.filtred = true;
    });
  }
  selectChangeHandler(event: any) {
    this.qte = event.target.value;
  }

  AddToCard(p: Product){
    this.empty = false;
    this.exist = false;
    this.productsCard.map(obj => {
      if (obj._id === p._id){
        this.exist = true;
        // @ts-ignore
        obj.q = obj.q + Number(this.qte);
      }
    });
    if (!this.exist){
      p.q = this.qte;
      this.productsCard?.push(p);
    }
    this.totalPrice = this.totalPrice + (Number(p.price) * this.qte ) ;
    this.qte = 1;
  }

  getProducts(): void {
    const dataa = {
      traderId: this.idTrader,
    };
    this.productService.getProductList(dataa)
      .subscribe(
        data => {
          data.map(p => {
            p.filtred = true;
          });
          this.products = data;
          console.log(data);
          this.loaded = false;
        },
        error => {
          console.log(error);
        });
  }
  countOccurences(text: string, word: string) {
    return text.split(word).length - 1;
  }

  getread(): void {
    this.adminService.getTagRead()
      .subscribe(
        data => {
          this.tagId = data;
          console.log(this.tagId)
          this.visible = true;
          this.visible2 = true;
        },
        error => {
          console.log(error);
        });
  }
  getchildbyt(): void {
    const dataa = {
      tag: this.tagId,
    };
    this.adminService.getChildbyTag(dataa)
      .subscribe(
        data => {
          this.idchildcom = data;
          console.log(data);
          this.visible = false;
        },
        error => {
          console.log(error);
        });
  }


  addCommandee(): void {
    for (let i = 0; i < this.productsCard.length; i++) {
      this.pr =  this.pr +  '/' +  this.productsCard[i]._id ;
      this.qteC =  this.qteC +  '/' +  this.productsCard[i].q ;
      //this.count = this.countOccurences(this.pr,this.productsCard[i]._id);
    }
    //console.log(this.count);
    console.log(this.pr);
    console.log(this.qteC);
    const data = {
      traderId: this.idTrader as string,
      shop: '60638160843a0286db71ba5e',
      products: this.pr,
      quantites: this.qteC,
      child: this.idchildcom,
      total: this.totalPrice
    };
      this.adminService.AddCommand(data)
        .subscribe(
          response => {
            console.log(response);
            Swal.fire(
              ' Commande Added Succefully!',
              '',
              'success'
            );
            this.visible = false;
            this.visible2 = true;

          },
          error => {
            console.log(error);
          });

  }

}
