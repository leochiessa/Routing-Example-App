//student-view.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerAsyncService } from 'src/app/services/career-async.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: Student = new Student();

  careerName: string;

  constructor(private studentService: StudentAsyncService, private careerService: CareerAsyncService, private route: ActivatedRoute) { }

  ngOnInit() {
    let studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getById(studentId).then(response => {
      this.student = response;
      if (this.student.careerId !== null) {
        this.careerService.getById(this.student.careerId).then(response => {
          this.careerName = response.name;
        });
      }
    }).catch(error => {
      console.error(error);
      alert("Error: " + error.error.message);
    });
  }
}