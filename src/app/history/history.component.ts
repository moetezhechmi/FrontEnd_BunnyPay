import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';
import {ProductService} from '../services/product.service';
import {Child} from '../models/child.model';
import {History} from '../models/history.model';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: History = {
    date: '',
    child: '',
    shop: '',
    total: '',
  };

  histories?: History[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getHistory();
  }
  getHistory(): void {
    this.productService.getHistoryList()
      .subscribe(
        data => {
          this.histories = data;
          console.log(data);

        },
        error => {
          console.log(error);
        });
  }
}
