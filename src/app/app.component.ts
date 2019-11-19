import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  loggedIn$: Observable<boolean>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loggedIn$ = this.userService.isLoggedIn;
  }

  logout() {
    this.userService.logout();
    setTimeout(() => { this.router.navigateByUrl("/login") }, 500)
  }
}