import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckEmailValidator } from './checkEmail';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})

export class UserSignUpComponent implements OnInit {
  user: User = new User();
  checkPassword: string;
  signupForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private checkEmail: CheckEmailValidator ) { }

  ngOnInit() {
    this.user.email = "";
    this.user.password = "";
    this.checkPassword = "";
    this.signupForm = new FormGroup({
      'email': new FormControl(this.user.email, { validators: [Validators.required, Validators.email], asyncValidators: [this.checkEmail.validate.bind(this.checkEmail)], updateOn: "blur" }),
      'password': new FormControl(this.user.password, [Validators.required]),
      'confirmPassword': new FormControl(this.checkPassword, [Validators.required])
    }, { validators: this.passwordsMatchValidator() });
    document.getElementsByTagName("input")[0].focus();
  }

  setPass(event: any) {
    this.user.password = event.target.value;
  }

  setConfirm(event: any) {
    this.checkPassword = event.target.value;
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordsDoNotMatch: true };
    };
  }

  passwordsDoNotMatch() {
    if (this.signupForm.errors) {
      return this.signupForm.errors.passwordsDoNotMatch;
    }
    return false;
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  signup() {
    let user = new User();
    user.email = this.email.value;
    user.password = this.password.value;

    this.userService.signup(user).subscribe(() => {
      alert("Alta Exitosa!");
      this.router.navigateByUrl("/login");
    }, error => {
      if (error.status === 409) {
        alert(`Error: el email: ${user.email} ya existe!`);
      } else {
        console.error(error);
        alert("Error: " + error.error.message);
      }
    })
  }
}