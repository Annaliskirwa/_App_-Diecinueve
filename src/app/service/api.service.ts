import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.API_ENDPOINT;

  constructor(
    private httpClient:HttpClient
  ) { }
  getAllCustomers():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'customer');
  }
  getAllAccounts():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'account');
  }
  createCustomer(customerObj:any):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl  +'customer', customerObj);
  }
  createAccount(accountObj:any):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'account',accountObj);
  }
}
