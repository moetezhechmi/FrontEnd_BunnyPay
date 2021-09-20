import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Trader} from '../models/Trader';

import Swal from 'sweetalert2';
import {HttpResponse} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  Trader: Trader = {
    email: '',
    password: '',

  };
  stringJson: any;
  stringObject: any;
  submitted = false;
  user = '1';
  constructor(private authService: AuthService, private  router: Router) {
  }
  ngOnInit(): void {
    localStorage.setItem('SeesionUser', this.user);
    const isConnected = localStorage.getItem("_id");

    if (isConnected!=null){
      const connectedMail = localStorage.getItem("email");

      if ((connectedMail == 'moetezhechmi.groun@esprit.tn')){
        this.router.navigateByUrl('/homeAdmin');
      }else {
        this.router.navigateByUrl("/home");
      }
    }
  }
  TraderLogin(): void {
    const data = {
      email: this.Trader.email,
      password: this.Trader.password,
    };
    this.authService.SignIn(data).
    subscribe((res: HttpResponse<any>) => {

        this.stringJson = JSON.stringify(res);
        this.stringObject = JSON.parse(this.stringJson);

        localStorage.setItem('email', this.stringObject.email);
        localStorage.setItem('firstname', this.stringObject.firstname);
        localStorage.setItem('lastname', this.stringObject.lastname);
        localStorage.setItem('phone', this.stringObject.phone);
        localStorage.setItem('_id', this.stringObject._id);



        console.log(this.stringObject.status);
        if(this.stringObject.status == 1 ){
          this.submitted = true;
          console.log("stqtus");
          this.router.navigateByUrl('/home');

          if ((this.Trader.email == 'moetezhechmi.groun@esprit.tn') && (this.Trader.password == 'moetezhechmi.groun@esprit.tn') ){
            this.router.navigateByUrl('/homeAdmin');


          }
        }

      if (this.Trader.email=="" && this.Trader.password==""){
        Swal.fire(
          'Warning',
          'Fields Empty',
          'warning'
        );
      }

        else if (this.Trader.email==""){
          Swal.fire(
            'Warning',
            'Email Empty',
            'warning'
          );
        }
        else if (this.Trader.password==""){
          Swal.fire(
            'Warning',
            'Password Empty',
            'warning'
          );
        }

        else if (this.stringObject.status == 3) {
          Swal.fire(
            'Warning',
            'Wrong password!',
            'warning'
          );
        }
        else if (this.stringObject.status == 2) {
          Swal.fire(
            'Warning',
            'Account not verified!',
            'warning'
          );
        }
        else if (this.stringObject.status == 0) {
          Swal.fire(
            'Warning',
            'User not found!',
            'warning'
          );
        }


        console.log(res);
      },
      error => {
        console.log(error);
      });
  }
}
