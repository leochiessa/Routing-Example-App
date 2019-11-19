import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private apiUrl = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/';

  constructor(private http: HttpClient, private userService: UserService) { }

  add(student: Student): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(studentId: number): Observable<any> {
    return this.http.get(this.apiUrl + studentId);
  }

  edit(student: Student): Observable<any> {
    return this.http.patch(this.apiUrl + student.studentId, student);
  };

  delete(studentId: number): Observable<any> {
    return this.http.delete(this.apiUrl + studentId);
  }

  checkDNI(studentDni: string): Observable<HttpResponse<any>> {
    return this.http.get("https://utn2019-avanzada2-tp8.herokuapp.com/api/students/identities", {
      params: new HttpParams().set("dni", studentDni),
      observe: "response"
    });
  }
}