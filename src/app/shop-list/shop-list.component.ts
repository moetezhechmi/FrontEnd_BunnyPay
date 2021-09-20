import { Component, OnInit } from '@angular/core';
import {Shop} from '../models/shop.model';
import {ShopService} from '../services/shop.service';
import Swal from 'sweetalert2';

interface Coordinates {
  address: string;
  latitude: number;
  longitude: number;
}
@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  address?: string;


  lat = 36.8992047;
  lng = 10.1875152;
  shop: Shop = {
    _id: '',
    name: '',
    description: '',
    town:'',
    street:'',
    traderId: '',
    owner: '',


  };
  submitted = false;
  shops?: Shop[];
  currentShop?: Shop;
  currentIndex = -1;
  idTrader = localStorage.getItem('_id');

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.retrieveshop();
    console.log("3aslema" +this.idTrader);
  }
  retrieveshop(): void {
    const data = {
      traderId: this.idTrader
    };
    this.shopService.displayShop(data)
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
    this.retrieveshop();
    this.currentShop = undefined;
    this.currentIndex = -1;
  }
  saveShop(): void {
    const data = {
      name: this.shop.name,
      description: this.shop.description,
      traderId: this.idTrader
    };

    if (this.shop.name=="" || this.shop.description==""){
      Swal.fire(
        'Warning',
        'Check Empty Fields!!',
        'warning'
      );
    }

    else{
      this.shopService.create(data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      this.submitted = true;
      Swal.fire(
        ' Shop Added Succefully!',
        '',
        'success'
      );
      this.refreshList();
    }




  }



  deleteShop(shop: Shop): void {
    const data = {
      traderId: this.idTrader,
      _id: shop._id,
    };
    this.shopService.deleteshop(data)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire(
            'Shop Deleted succefully!',
            '',
            'success'
          )
          this.refreshList();

        },
        error => {
          console.log(error);
        });
  }


  getShop(): void {
    const data = {
      traderId: this.idTrader
    };
    this.shopService.displayShop(data)
      .subscribe(
        response => {
          console.log(response);
          console.log(response.getShop());



          this.submitted = true;
        },


        error => {
          console.log(error);
        });

  }

  newShop(): void {
    this.submitted = false;
    this.shop = {
      name: '',
      description: '',
      traderId:''
    };
  }


}


