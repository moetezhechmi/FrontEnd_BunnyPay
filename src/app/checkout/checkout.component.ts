import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {ShopService} from '../services/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Commande} from '../models/commande.model';
import Swal from 'sweetalert2';
import {AdminService} from '../services/admin.service';
import { Shop } from '../models/shop.model';

export let totalPrice = 0;
export let productPanier: Product[] = [];

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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
    pricepanier : 0,
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
  x: number = 0 ;
  y: number = 0 ;
  shops?: Shop[];
  shopName = '' ;
  totalPanier = 0;
  loaded = true;
  qte = 1;
  exist = false;
  idTrader = localStorage.getItem('_id');
  products: Product[] = [];
  products1: Product[] = [];
  products2: Product[] = [];
  products3: Product[] = [];
  productsF: Product[] = [];
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
  search: any;
  constructor(private productService: ProductService, private shopService: ShopService, private route: ActivatedRoute, private router: Router,  private adminService: AdminService) {}

  ngOnInit(): void {
    this.retrieveshop();
    this.getProducts();




  }



  retrieveshop(): void {
    const dataa = {
      traderId: this.idTrader
    };
    this.shopService.displayShop(dataa)
      .subscribe(
        data => {
          this.shops = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

  }

  drinks(){
    this.productsF=[];
    this.products?.map(obj => {
      if (obj.category == 'drinks'){
        this.productsF.push(obj);
      }
    });
    this.changeViewProducts(this.productsF);
  }
  foods(){
    this.productsF=[];
    this.products?.map(obj => {
      if (obj.category == 'foods'){
        this.productsF.push(obj);
      }
    });
    this.changeViewProducts(this.productsF);
  }
  fruits(){
    this.productsF=[];
    this.products?.map(obj => {
      if (obj.category == 'fruits'){
        this.productsF.push(obj);
      }
    });
    this.changeViewProducts(this.productsF);
  }
  cake(){
    this.productsF=[];
    this.products?.map(obj => {
      if (obj.category == 'cake'){
        this.productsF.push(obj);
      }
    });
    this.changeViewProducts(this.productsF);
  }
  bread(){
    this.productsF=[];
    this.products?.map(obj => {
      if (obj.category == 'bread'){
        this.productsF.push(obj);
      }
    });
    this.changeViewProducts(this.productsF);
  }
  vegetables(){
    this.productsF=[];
    this.products?.map(obj => {
      if (obj.category == 'vegetables'){
        this.productsF.push(obj);
      }
    });
    this.changeViewProducts(this.productsF);
  }
  iceCream(){
    this.productsF=[];
    this.products?.map(obj => {
      if (obj.category == 'iceCream'){
        this.productsF.push(obj);
      }
    });
    this.changeViewProducts(this.productsF);
  }
  all(){
    this.changeViewProducts(this.products );
  }


  AddToCard(p: Product){
    this.empty = false;
    this.exist = false;
    this.productsCard.map(obj => {
      if (obj._id === p._id){
        this.exist = true;
        // @ts-ignore
        obj.q = obj.q + Number(this.qte);
        obj.pricepanier = Number(p.price) * this.qte;
        console.log(obj.pricepanier);
      }
    });
    if (!this.exist){
      p.q = this.qte;
      p.pricepanier = Number(p.price) * this.qte;
      this.productsCard?.push(p);
    }
    totalPrice = totalPrice + (Number(p.price) * this.qte ) ;
    this.totalPanier = totalPrice;
    this.qte = 1;
    // @ts-ignore
    productPanier = this.productsCard;
  }

  AddtoPanier(){

  }

  changeViewProducts(products : Product[]){
    this.products1=[];
    this.products2=[];
    this.products3=[];
    this.x = Math.trunc(products.length/3);
    this.y = Math.trunc(products.length%3);
    for(let i=0;i<this.x;i++){
      this.products1?.push(products[i]);
    }
    for(let i=this.x;i<this.x*2;i++){
      this.products2?.push(products[i]);
    }
    if(this.x*3==products.length){
      for(let i=this.x*2;i<this.x*3;i++){
        this.products3?.push(products[i]);
      }
    }else if((this.x*3+1)==products.length) {
      for(let i=this.x*2;i<=this.x*3;i++){
        this.products3?.push(products[i]);
      }
    }else {
      for(let i=this.x*2;i<=this.x*3;i++){
        this.products3?.push(products[i]);
      }
      this.products2?.push(products[this.x*3+1]);
    }
  }


  selectChangeHandler(event: any) {
    this.loaded = false;
    this.shopName = event.target.value;

    this.getProducts();
    this.loaded = true;

  }


  changeViewProductss(products : Product[]){
    console.log(Math.trunc(products.length/2));
    this.x = Math.trunc(products.length/2);
    for(let i=0;i<this.x;i++){
      this.products1?.push(products[i]);
    }
    if(this.x*2==products.length){
      for(let i=this.x;i<this.x*2;i++){
        this.products2?.push(products[i]);
      }
    }else{
      for(let i=this.x;i<=this.x*2;i++){
        this.products2?.push(products[i]);
      }
    }
  }

  getProducts(): void {
    const dataa = {
      traderId: this.idTrader,
      nameshop: this.shopName,
    };
    this.productService.getProductList(dataa)
      .subscribe(
        data => {
          data.map(p => {
            p.filtred = true;
          });
          this.products = data;
          this.changeViewProducts(this.products);
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
          this.addCommandee();

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
      shop: '606d461c012928c2d8ebb282',
      products: this.pr,
      quantites: this.qteC,
      child: this.idchildcom,
      total: totalPrice
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

