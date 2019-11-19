import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = 'https://utn2019-avanzada2-tp8.herokuapp.com';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  redirectUrl: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  setToken(response: any) { localStorage.setItem("token", response.jwt ? response.jwt : ""); }
  getToken() { return localStorage.getItem("token"); }

  login(user: User): Observable<any> {
    return this.http.post(this.url + "/login", user).pipe(
      map(response => {
        this.setToken(response);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    this.setToken("");
    this.loggedIn.next(false);
  }

  signup(user: User): Observable<any> {
    return this.http.post(this.url + "/sign-up", user);
  }

  checkEmail(studentEmail: string): Observable<HttpResponse<any>> {
    return this.http.get("https://utn2019-avanzada2-tp8.herokuapp.com/users/identities", {
      params: new HttpParams().set("email", studentEmail),
      observe: "response"
    });
  }
}