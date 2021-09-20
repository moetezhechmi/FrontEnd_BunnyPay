import {Component, OnInit} from '@angular/core';
import {AdminService} from '../services/admin.service';
import Swal from 'sweetalert2';
import {HttpResponse} from '@angular/common/http';
import {Child} from '../models/child.model';
import {Shop} from '../models/shop.model';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  child: Child = {
    _id: '',
    firstname: '',
    lastname: '',
    age: '',
    sexe: '',
    etat: '',
    parentId: '',
    photo: '',
    accepted: '',
    status: '',
  };
  tagId = '';
  splitted = '';
  substrtag: any;
  childs?: Child[];
  stringJson: any;
  stringObject: any;
  varibale: any;
  submitted = false;
  visible = true;
  currentChild?: Child;
  currentIndex = -1;
  accept = false;

  show = true;


  cc: any;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getChild();
    this.getwrite();
  }


  getChild(): void {
    this.adminService.getChildren()
      .subscribe(
        data => {

          this.childs = data;
          console.log(data);
          if (this.child.status == 'Tag affected'){
            this.show = false;
          }

        },
        error => {
          console.log(error);
        });
  }

  getwrite(): void {
    this.adminService.getTagWrite()
      .subscribe(
        data => {
          this.tagId = data;
          this.splitted = this.tagId.split(',', 1).toString();
          console.log(this.splitted);
          this.visible = false;
        },
        error => {
          console.log(error);
        });
  }
  acceptchild(child: Child): void {
    console.log(this.splitted);
    const data = {
      childId: child._id,
      parentId: child.parentId,
    };
    this.adminService.Accept(data)
      .subscribe(
        response => {
          console.log(response);

          this.stringJson = JSON.stringify(data);
          this.stringObject = JSON.parse(this.stringJson);
          console.log(this.stringObject);
          Swal.fire(
            'Child Accepted succefully!',
            '',
            'success'
          );

          this.getChild();
          this.send();
        },
        error => {
          console.log(error);
        });

  }

  send(): void {
    this.adminService.sendsms()
      .subscribe(
        data => {

          this.childs = data;
          console.log(data);
          if (this.child.status == 'Tag affected'){
            this.show = false;
          }

        },
        error => {
          console.log(error);
        });
  }


  AdhererChild(child: Child): void {
    console.log(this.splitted);
    const data = {
      childId: child._id,
      parentId: child.parentId,
      tagId: this.splitted,
    };
    this.adminService.Adherer(data)
      .subscribe(
        response => {
          console.log(response);

          this.stringJson = JSON.stringify(data);
          this.stringObject = JSON.parse(this.stringJson);
          console.log(this.stringObject);

          this.getChild();
        },
        error => {
          console.log(error);
        });

  }



  refuseChild(child: Child): void {
    const data = {
      childId: child._id,
      parentId: child.parentId,
    };
    this.adminService.refuseChild(data)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire(
            'Child Refused succefully!',
            '',
            'success'
          );
          this.refreshList();

        },
        error => {
          console.log(error);
        });
  }


  refreshList(): void {
    this.getChild();
    this.currentChild = undefined;
    this.currentIndex = -1;
  }
  getchild(child: Child): void{
    this.child = child;
  }

}





