import { Component, OnInit } from '@angular/core';
import {Trader} from '../models/Trader';
import Swal from 'sweetalert2';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  idTrader = localStorage.getItem('_id');
  traider: Trader = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    oldPassword: '',
    newPassword: '',
  };
  tr?: Trader[];
  // @ts-ignore
  form: FormGroup;
  submitted = false;
  constructor(private authService: AuthService, private  router: Router) { }

  ngOnInit(): void {
    this.getTr();
    this.form = new FormGroup({
      lastname: new FormControl(null),
      firstname: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      oldPass: new FormControl(null),
      newPass: new FormControl(null),
      cPass: new FormControl(null)
    });
  }
  getTr(): void {
    const dataa = {
      traderId: this.idTrader,
    };
    this.authService.getTrader(dataa)
      .subscribe(
        data => {
          this.traider = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void {
    this.getTr();
  }
  updatetrader(): void {
    const data = {
      traderId: this.idTrader,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      phone: this.form.value.phone,
      oldPassword: this.form.value.oldPass,
      newPassword: this.form.value.newPass,

    };
    if ( this.form.value.cPass != this.form.value.newPass){
      Swal.fire(
        'not matches',
        '',
        'warning'
      );
    }
    else{
      this.authService.UpdateTrader(data)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            Swal.fire(
              'updated Succefully!',
              '',
              'success'
            );
            this.refreshList();
          },
          error => {
            console.log(error);
          });
    }
  }

}
