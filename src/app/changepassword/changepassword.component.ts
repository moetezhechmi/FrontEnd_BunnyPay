import { Component, OnInit } from '@angular/core';
import { ChangepasswordService } from './changepassword.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private changePasswordService: ChangepasswordService)  { }

  ngOnInit(): void {
  }

  onSubmit(resetForm : any) {
    console.log(resetForm.token);
    this.changePasswordService.resetPassword(resetForm)
    .subscribe(
      data => {
        console.log(data)
    })

  }

}
