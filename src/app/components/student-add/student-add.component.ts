import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Career } from 'src/app/models/career';
import { StudentService } from 'src/app/services/student.service';
import { CareerService } from 'src/app/services/career.service';
import { FormControl, FormGroup, Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { CheckDNIValidator } from './checkDNI.validator';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})

export class StudentAddComponent implements OnInit {
  student: Student = new Student();
  careerList = new Array<Career>();
  studentForm: FormGroup;

  constructor(private studentService: StudentService, private careerService: CareerService, private checkDNI: CheckDNIValidator) { }

  ngOnInit() {
    this.student.firstName = "";
    this.student.lastName = "";
    this.student.dni = "";
    this.student.email = "";
    this.student.address = "";
    this.student.careerId = 1;
    this.studentForm = new FormGroup({
      'lastName': new FormControl(this.student.lastName, [Validators.required]),
      'firstName': new FormControl(this.student.firstName, [Validators.required]),
      'dni': new FormControl(this.student.dni, { validators: Validators.required, asyncValidators: [this.checkDNI.validate.bind(this.checkDNI)], updateOn: "blur"}),
      'email': new FormControl(this.student.email, [Validators.required, Validators.email]),// this.checkStudent()),
      'address': new FormControl(this.student.address, [Validators.required]),
      'careerId': new FormControl(this.student.careerId)
    });
    document.getElementsByTagName("input")[0].focus();
    this.careerService.getAll().subscribe(response => {
      this.careerList = response;
    }, error => {
      console.error(error);
      //alert("Error: " + error.error.message);
    })
  }

  get lastName() { return this.studentForm.get('lastName'); }
  get firstName() { return this.studentForm.get('firstName'); }
  get dni() { return this.studentForm.get('dni'); }
  get email() { return this.studentForm.get('email'); }
  get address() { return this.studentForm.get('address'); }
  get careerId() { return this.studentForm.get('careerId'); }

  addStudent() {
    let student = new Student();
    student.firstName = this.firstName.value;
    student.lastName = this.lastName.value;
    student.dni = this.dni.value;
    student.email = this.email.value;
    student.address = this.address.value;
    student.careerId = this.careerId.value;

    this.studentService.add(student).subscribe(() => {
      this.firstName.setValue("");
      this.lastName.setValue("");
      this.dni.setValue("");
      this.email.setValue("");
      this.address.setValue("");
      this.careerId.setValue(1);
      alert("Alta Exitosa!");
      document.getElementsByTagName("input")[0].focus();
    }, error => {
      alert(`Error: ${error.error.message}`);
      document.getElementsByTagName("input")[0].focus();
      console.error(error);
    })
  }
}