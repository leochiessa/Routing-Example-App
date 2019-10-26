import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { LogInService } from 'src/app/services/log-in.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  account: Account = new Account();
  loginForm: FormGroup;

  constructor(private loginService: LogInService) { }

  ngOnInit() {
    this.account.email = "";
    this.account.password = "";
    this.loginForm = new FormGroup({
      'email': new FormControl(this.account.email, [Validators.required]),
      'password': new FormControl(this.account.password, [Validators.required])
    });
    document.getElementsByTagName("input")[0].focus();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    let account = new Account();
    account.email = this.email.value;
    account.password = this.password.value;

    this.loginService.login(account).then(response => {
      alert(response.jwt);
    }).catch(error => {
      if (error.status === 401) {
        console.error(error);
        alert("Error: " + error.error.message);
      }
    });
  }
}