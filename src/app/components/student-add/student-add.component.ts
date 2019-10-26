import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Career } from 'src/app/models/career';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerAsyncService } from 'src/app/services/career-async.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  student: Student = new Student();
  careerList = new Array<Career>();
  careerId: number;
  studentForm: FormGroup;

  constructor(private studentService: StudentAsyncService, private careerService: CareerAsyncService) { }

  ngOnInit() {
    this.student.firstName = "";
    this.student.lastName = "";
    this.student.dni = "";
    this.student.email = "";
    this.student.address = "";
    this.student.careerId = null;
    this.careerId = 1;
    this.studentForm = new FormGroup({
      'lastName': new FormControl(this.student.lastName, [Validators.required]),
      'firstName': new FormControl(this.student.firstName, [Validators.required]),
      'dni': new FormControl(this.student.dni, [Validators.required]),
      'email': new FormControl(this.student.email, [Validators.required]),
      'address': new FormControl(this.student.address, [Validators.required])
    });
    document.getElementsByTagName("input")[0].focus();
    this.careerService.getAll().then(response => {
      this.careerList = response;
    }).catch(error => {
      console.error(error);
      alert("Error: " + error.error.message);
    });
  }

  get lastName() { return this.studentForm.get('lastName'); }
  get firstName() { return this.studentForm.get('firstName'); }
  get dni() { return this.studentForm.get('dni'); }
  get email() { return this.studentForm.get('email'); }
  get address() { return this.studentForm.get('address'); }

  addStudent() {
    let student = new Student();
    student.firstName = this.firstName.value;
    student.lastName = this.lastName.value;
    student.dni = this.dni.value;
    student.email = this.email.value;
    student.address = this.address.value;
    student.careerId = this.careerId;

    this.studentService.add(student).then(() => {
      this.firstName.setValue("");
      this.lastName.setValue("");
      this.dni.setValue("");
      this.email.setValue("");
      this.address.setValue("");
      this.careerId = 1;
      alert("Alta Exitosa!");
      document.getElementsByTagName("input")[0].focus();
    }).catch(error => {
      console.error(error);
      alert(error.statusText)
    });
  }
}