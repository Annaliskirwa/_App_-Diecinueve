import { Component, Inject, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
import { ApiService } from "../service/api.service";
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInGrow', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, marginTop: 30 }),
          stagger('80ms', [
            animate('400ms ease', style({ opacity: 1, marginTop: 0 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class CustomerComponent implements OnInit {
  showForm = false;
  createCustomerSuccess = false;
  createCustomerFail = false;
  customers: any[] = [];
  customer = {
        firstName: "Annalis",
        lastName: "Kirwa",
        identificationNumber: "1234",
        phoneNumber: "0000"
  }

  constructor(public auth: AuthService,
    @Inject(DOCUMENT) public document: Document){}


  ngOnInit(): void {
  }

}
