import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
import { ApiService } from "../service/api.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
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
export class AccountComponent implements OnInit {
  showForm = false;
  createAccountSuccess = false;
  createAccountFail = false;
  accounts: any[] = [];
  account = {
    accountNumber: "63666",
    accountName: "Ann",
    customer:{
        customerId: 1
    }
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
  toggleForm():void{
    this.showForm = !this.showForm;
  }
  createAccount():void{
    this.apiService.createAccount(this.account).subscribe((res:any)=>{
      this.createAccountSuccess = true;
      this.createAccountFail = false;

      this.account = {
        accountNumber: "63666",
        accountName: "Ann",
        customer:{
            customerId: 1
        }};
        this.showForm = false;
    },
    (error:any)=>{
      this.createAccountSuccess = false;
      this.createAccountFail = true;
    },
    ()=>{
      this.getAllAccounts();
      setTimeout(()=>{
        this.createAccountSuccess = false;
        this.createAccountFail = true;
      }, 5000)
    })
  }

}
