import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {FormControl, FormGroup} from '@angular/forms';
import {Trader} from '../models/Trader';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  Traider: Trader = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  };
  imageData = '';
  // @ts-ignore
  form: FormGroup;
  submitted = false;
  constructor(private authService: AuthService,private  router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null),
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      phone: new FormControl(null),
      password: new FormControl(null),
      image: new FormControl(null)
    });
  }
  saveTraider() {
    const data = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.form.value.password
    };

    if (this.Traider.email=="" && this.Traider.firstname=="" && this.Traider.lastname==""&& this.Traider.phone==""&& this.Traider.password=="" ){
      Swal.fire(
        'Warning',
        ' Check Empty Fields!!',
        'warning'
      );
    }
    else if (this.Traider.email==""){
      Swal.fire(
        'Warning',
        'Email Empty',
        'warning'
      );
    }
    else if (this.Traider.firstname==""){
      Swal.fire(
        'Warning',
        'Firstname Empty',
        'warning'
      );
    }
    else if (this.Traider.lastname==""){
      Swal.fire(
        'Warning',
        'Lastname Empty',
        'warning'
      );
    }
    else if (this.Traider.phone==""){
      Swal.fire(
        'Warning',
        'Phone Empty',
        'warning'
      );
    }
    else if (this.Traider.password==""){
      Swal.fire(
        'Warning',
        'Password Empty',
        'warning'
      );
    }


else {

      this.authService.SignUp(data)
        .subscribe(
          response => {
            console.log(response);




            this.submitted = true;
            this.router.navigateByUrl('/validation');

            localStorage.getItem(response.token);


          },
          error => {
            console.log(error);
          });
    }


  }

  newTraider() {
    this.submitted = false;
    this.Traider = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: ''
    };
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ image: event.target.files[0].name });
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
  onSubmit(){
    console.log(this.imageData);
    this.authService.signupimage(this.form.value.email, this.form.value.firstname , this.form.value.lastname, this.form.value.phone, this.form.value.password, this.form.value.image);
  }
}
