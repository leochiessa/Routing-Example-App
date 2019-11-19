import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Career } from 'src/app/models/career';
import { StudentService } from 'src/app/services/student.service';
import { CareerService } from 'src/app/services/career.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: Student = new Student();
  careerList = new Array<Career>();
  careerId: number;
  studentForm: FormGroup;

  constructor(private studentService: StudentService, private careerService: CareerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentForm = new FormGroup({
      'lastName': new FormControl(this.student.lastName, [Validators.required]),
      'firstName': new FormControl(this.student.firstName, [Validators.required]),
      'dni': new FormControl(this.student.dni, [Validators.required]),
      'email': new FormControl(this.student.email, [Validators.required]),
      'address': new FormControl(this.student.address, [Validators.required])
    })
    this.studentService.getById(studentId).subscribe(response => {
      this.student = response;
      this.firstName.setValue(this.student.firstName);
      this.lastName.setValue(this.student.lastName);
      this.dni.setValue(this.student.dni);
      this.email.setValue(this.student.email);
      this.address.setValue(this.student.address);
      this.careerId = this.student.careerId;
      document.getElementsByTagName("input")[0].focus();
      this.careerService.getAll().subscribe(response => {
        this.careerList = response;
      })
    }, error => {
      console.error(error);
      alert("Error: " + error.error.message);
    })
  }

  get lastName() { return this.studentForm.get('lastName'); }
  get firstName() { return this.studentForm.get('firstName'); }
  get dni() { return this.studentForm.get('dni'); }
  get email() { return this.studentForm.get('email'); }
  get address() { return this.studentForm.get('address'); }

  edit() {
    let student = new Student();
    student.studentId = this.student.studentId;
    student.firstName = this.firstName.value;
    student.lastName = this.lastName.value;
    student.dni = this.dni.value;
    student.email = this.email.value;
    student.address = this.address.value;
    student.careerId = this.careerId;

    this.studentService.edit(student).subscribe(() => {
      alert("Modificación Exitosa!");
      this.router.navigateByUrl("/list");
    }, error => {
      console.error(error);
      alert("Error: " + error.error.message);
    })
  }
}