import { Component, OnInit, Inject } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
import { ApiService } from "../service/api.service";
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

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
    accountName: "Ann",
    customer:{
      identificationNumber: 1234
    }
}

  constructor(public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
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
        accountName: "Ann",
        customer:{
          identificationNumber: 1234
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
