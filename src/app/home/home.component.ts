import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
import { ApiService } from "../service/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {
  accounts: any[] = [];
  account = {
    customerFirstName: 'Annalis',
    customerLastName: 'Kirwa',
    customerIdentificationNumber: '1234',
    customerPhoneNumber: '0000',
    accountNumber: '63666',
    accountName: 'Ann'
}

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }
  getAllAccounts():void{
    this.apiService.getAllAccounts().subscribe((res:any)=>{
      this.accounts =res;
      console.log(res);},
      (error:any)=>{
        console.log("no account found")
      })
  }

}
