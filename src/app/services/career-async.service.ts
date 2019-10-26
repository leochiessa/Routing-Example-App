//career.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CareerAsyncService {
  private apiUrl = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/careers/';
  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise();
  }

  getById(careerId: number): Promise<any> {
    return this.http.get(this.apiUrl + careerId).toPromise();
  }
}