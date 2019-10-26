//student.service.ts
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StudentAsyncService {
  private apiUrl = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/';
  constructor(private http: HttpClient) { }

  add(student: Student): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.apiUrl, student, httpOptions).toPromise();
  }

  getAll(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise();
  }

  getById(studentId: number): Promise<any> {
    return this.http.get(this.apiUrl + studentId).toPromise();
  }

  edit(student: Student): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.patch(this.apiUrl + student.studentId, student, httpOptions).toPromise();
  };
}