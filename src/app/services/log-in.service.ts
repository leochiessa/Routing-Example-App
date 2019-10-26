//log-in.service.ts
import { Injectable } from '@angular/core';
import { Account } from 'src/app/models/account';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  private apiUrl = 'https://utn2019-avanzada2-tp8.herokuapp.com/login';
  constructor(private http: HttpClient) { }

  login(account: Account): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.apiUrl, account, httpOptions).toPromise();
  }
}