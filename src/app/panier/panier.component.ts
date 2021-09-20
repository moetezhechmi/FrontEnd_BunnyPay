import { Component , OnInit } from '@angular/core';
import {productPanier, totalPrice} from '../checkout/checkout.component';
import {Product} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {ShopService} from '../services/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],


})



export class PanierComponent implements OnInit{

  totalfinal = 0;
  tap = false;
  qte = 0;
  products: Product[] = [];
  visible = true;
  tagId: string = '';
  splitted: string = '';
  idTrader = localStorage.getItem('_id');
  visible2 = false;
  pr: string = '';
  idchildcom: string = '';
  soldecom: string = '';
  qteC: string = '';
  constructor(private productService: ProductService, private shopService: ShopService, private route: ActivatedRoute, private router: Router,  private adminService: AdminService) { }

  ngOnInit(): void {
    console.log(totalPrice);
    //console.log(productPanier);
    this.totalfinal = totalPrice;
    this.products = productPanier;




    this.getread();
  }
  selectChangeHandler(event: any) {
    this.qte = event.target.value;
    this.tap = true;
  }
calclulPrice(p: Product): void {
    if (this.tap) {

      this.products.map(obj => {
        if (obj._id === p._id){
          obj.pricepanier = Number(p.price) * this.qte;
          this.totalfinal = this.totalfinal + Number(p.price) ;


        }

      });
    }
}

delete(p: Product): void {
 const index: number = this.products.indexOf(p);
 this.products.splice(index,1);
  this.totalfinal = this.totalfinal - Number(p.pricepanier);

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
         this.getchildSoldebyt();

        },
        error => {
          console.log(error);
        });
  }
  getchildSoldebyt(): void {
    const dataa = {
      tag: this.tagId,
    };
    this.adminService.getChildSoldebyTag(dataa)
      .subscribe(
        data => {
          this.soldecom = data;
          console.log(this.soldecom);
          this.visible = false;
          this.addCommandee();
        },
        error => {
          console.log(error);
        });
  }
  updates(): void {
    const dataa = {
      parentId: "6048214ebdebb8ef3eadd815",
      childId: this.idchildcom,
      total: this.totalfinal
    };
    this.adminService.updateSolde(dataa)
      .subscribe(
        data => {
        },
        error => {
          console.log(error);
        });
  }


  addCommandee(): void {

    for (let i = 0; i < this.products.length; i++) {
      this.pr =  this.pr +  '/' +  this.products[i]._id ;
      this.qteC =  this.qteC +  '/' +  this.products[i].q ;
    }
    console.log(this.pr);
    console.log(this.qteC);


    const data = {
      traderId: this.idTrader as string,
      shop: '606d461c012928c2d8ebb282',
      products: this.pr,
      quantites: this.qteC,
      solde: this.soldecom,
      child: this.idchildcom,
      total: this.totalfinal
    };
    console.log(Number(this.soldecom))
    if(Number(this.soldecom) >= this.totalfinal) {
      this.adminService.AddCommand(data)
        .subscribe(
          response => {
            console.log(response);

            Swal.fire(
              ' Commande Added Succefully!',
              '',
              'success'
            );
            this.updates();

            this.router.navigateByUrl('/checkout');


          },
          error => {
            console.log(error);
          });
    }
    else{
      Swal.fire(
        ' Solde insuffisant!',
        '',
        'warning'
      );
    }

  }
}
