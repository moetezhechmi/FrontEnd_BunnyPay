import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private  router: Router) {
  }

  ngOnInit(): void {
    const trouv = localStorage.getItem("_id");
    if (trouv == null) {
      this.router.navigateByUrl('');
    }
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('phone');
    localStorage.removeItem('_id');
    this.router.navigateByUrl('');

  }
}
