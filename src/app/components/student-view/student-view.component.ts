import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { CareerService } from 'src/app/services/career.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: Student = new Student();

  careerName: string;

  constructor(private studentService: StudentService, private careerService: CareerService, private route: ActivatedRoute) { }

  ngOnInit() {
    let studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getById(studentId).subscribe(response => {
      this.student = response;
      if (this.student.careerId !== null) {
        this.careerService.getById(this.student.careerId).subscribe(response => {
          this.careerName = response.name;
        })
      }
    }, error => {
      console.error(error);
      alert("Error: " + error.error.message);
    })
  }
}