import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { SignUpService } from 'src/app/services/sign-up.service';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  account: Account = new Account();
  checkPassword: string;
  signupForm: FormGroup;

  constructor(private signupService: SignUpService) { }

  ngOnInit() {
    this.account.email = "";
    this.account.password = "";
    this.checkPassword = "";
    this.signupForm = new FormGroup({
      'email': new FormControl(this.account.email, [Validators.required]),
      'password': new FormControl(this.account.password, [Validators.required]),
      'confirmPassword': new FormControl(this.checkPassword, [Validators.required, this.checkPass()])
    });
    document.getElementsByTagName("input")[0].focus();
  }

  setPass(event: any){
    this.account.password=event.target.value;
    console.log(this.account.password);
  }

  checkPass(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validPassword = (this.account.password !== control.value);
      return validPassword ? { "confirmPassword": { value: control.value } } : null;
    }
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  signup() {
    let account = new Account();
    account.email = this.email.value;
    account.password = this.password.value;

    this.signupService.signup(account).then(() => {
      this.email.setValue("");
      this.password.setValue("");
      this.confirmPassword.setValue("");
      alert("Alta Exitosa!");
      document.getElementsByTagName("input")[0].focus();
    }).catch(error => {
      if (error.status === 409) {
        alert(`Error: el email: ${account.email} ya existe!`);
      } else {
        console.error(error);
        alert("Error: " + error.error.message);
      }
    });
  }
}