import { Component, OnInit } from '@angular/core';
import { ValidationaccountService } from './validationaccount.service';

@Component({
  selector: 'app-validationaccount',
  templateUrl: './validationaccount.component.html',
  styleUrls: ['./validationaccount.component.css']
})
export class ValidationaccountComponent implements OnInit {

  constructor(private validateAccountService: ValidationaccountService) { }

  ngOnInit(): void {
  }

  onSubmit(validateForm : any) {
    console.log(validateForm.token);
    this.validateAccountService.validateaccount(validateForm)
    .subscribe(
      data => {
        console.log(data)
    })

  }
}
