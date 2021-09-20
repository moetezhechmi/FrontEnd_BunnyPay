import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from './forgot-password.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  constructor(private resetPasswordService: ResetPasswordService,private  router: Router)  { }

  ngOnInit(): void {
  }
  onSubmit(resetForm : any) {
    console.log(resetForm.email);
     this.resetPasswordService.resetPassword(resetForm)
     .subscribe(
      data => {
  console.log(data)
        Swal.fire(
          'Check Your Email',
          '',
          'success'
        )
        this.router.navigateByUrl("/changepassword");

      })

  }


}
