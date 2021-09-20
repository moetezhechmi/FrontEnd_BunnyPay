import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {Shop} from '../models/shop.model';
import {ProductService} from '../services/product.service';
import {ShopService} from '../services/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: Product = {
    _id: '',
    name: '',
    price: '',
    quantite: '',
    photo: '',
    shopname: '',
    shopId: '' ,
    traderId: '' ,

  };
  idTrader = localStorage.getItem('_id');

  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  prod: Product;
  imageData = '';
  imageDataUpdate = '';
  shops?: Shop[];
  products?: Product[];
  currentProduct?: Product;
  currentIndex = -1;
  shopname: any;
  id = '' ;
  cat = '';
  submitted = false;
  selectedDay = '';
  constructor(private productService: ProductService, private shopService: ShopService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.retrieveshop();
    this.getProducts();
    this.form = new FormGroup({
      traderId: new FormControl(null),
      shopId: new FormControl(null),
      productId: new FormControl(null),
      name: new FormControl(null),
      price: new FormControl(null),
      quantite: new FormControl(null),
      image: new FormControl(null)
    });
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

  refreshList(): void {
    this.getProducts();
    this.currentProduct = undefined;
    this.currentIndex = -1;
  }
  getProducts(): void {
    const dataa = {
      traderId: this.idTrader,
    };
    this.productService.getProductList(dataa)
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  getUpdateProduct(product: Product): void{
    this.imageDataUpdate = "http://localhost:3000"+product.photo as string;
    this.product = product;
  }
  selectChangeHandler(event: any) {
    this.id = event.target.value;
  }
  selectChangeHandlerCat(event: any) {
    this.cat = event.target.value;
  }
  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      price: '',
      quantite: ''
    };
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ image: file });
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  selectImageUpdate(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ image: file });
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageDataUpdate = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  onSubmit(){

      this.productService.addProductfile(this.idTrader as string, this.id, this.form.value.name, this.form.value.price , this.form.value.quantite, this.form.value.image, this.cat);


  }


  deleteProduct(product: Product): void {
    const data = {
      traderId: this.idTrader,
      shopId: product.shopId,
      _id: product._id
    };
    this.productService.deleteProduct(data)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire(
            'Product Deleted succefully!',
            '',
            'success'
          ),
            this.refreshList(); },
        error => {
          console.log(error);
        });
  }


  updateprod(): void {
   const data = {
     traderId: this.idTrader,
     ShopId: this.product.shopId,
     _id: this.product._id,
     name: this.form.value.name,
     price: this.form.value.price,
     quantite: this.form.value.quantite,
     file: this.form.value.image
    };
   console.log(data);
    this.productService.updateProdct(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  onSubmitUpdate(){
    this.productService.updateProductfile(this.form.value.name, this.form.value.price, this.form.value.quantite, this.form.value.image );
  }
}


