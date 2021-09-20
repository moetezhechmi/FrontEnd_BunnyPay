import { Component, OnInit } from '@angular/core';
import {Ticket} from '../models/ticket.model';
import {AdminService} from '../services/admin.service';
import Swal from 'sweetalert2';
import {PdfMakeWrapper,Txt} from 'pdfmake-wrapper';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  ticket: Ticket = {
    _id: '',
    code: '',
    montant: '',
    used: '',
    traderId: ''
  };
  submitted = false;
  tickets?: Ticket[];
  currentTicket?: Ticket;
  currentIndex = -1;

  idTrader = localStorage.getItem('_id');
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  generatePdf(){
    const pdf = new PdfMakeWrapper();
    pdf.add(new Txt("hello"));
    pdf.create().open();
  }
  refreshList(): void {
    this.getTickets();
    this.currentTicket = undefined;
    this.currentIndex = -1;
  }

  getTickets(): void {
    const data = {
      traderId: this.idTrader
    };
    this.adminService.getTicket(data)
      .subscribe(
        data => {
          this.tickets = data;
          console.log(data);


        },
        error => {
          console.log(error);
        });

  }
  createTicket(): void {
    const data = {
      traderId: this.idTrader,
      code: this.ticket.code,
      montant: this.ticket.montant
    };


    if (this.ticket.code=="" || this.ticket.montant==""){
      Swal.fire(
        'Warning',
        'Check Empty Fields!!',
        'warning'
      );
    }
    else {
      this.adminService.createTicket(data)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            Swal.fire(
              ' Ticket Added Succefully!',
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
