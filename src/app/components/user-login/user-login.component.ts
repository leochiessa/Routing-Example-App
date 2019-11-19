import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLogInComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user.email = "";
    this.user.password = "";
    this.loginForm = new FormGroup({
      'email': new FormControl(this.user.email, [Validators.required]),
      'password': new FormControl(this.user.password, [Validators.required])
    });
    document.getElementsByTagName("input")[0].focus();
  }

  login() {
    let user = new User();
    user.email = this.email.value;
    user.password = this.password.value;

    this.userService.login(user).subscribe((response) => {
      if (localStorage.getItem("token")) {
        let redirect = this.userService.redirectUrl ? this.router.parseUrl(this.userService.redirectUrl) : '/list';
        this.router.navigateByUrl(redirect);
      }
    }, error => {
      console.error(error);
      alert("Error: " + error.error.message);
    })
  }
  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}