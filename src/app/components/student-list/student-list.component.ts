import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList = new Array<Student>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.studentService.getAll().subscribe(response => {
      this.studentList = response;
    }, error => {
      console.error(error);
      alert("Error: " + error.error.message);
    })
  }
  
  delete(studentId) {
    this.studentService.delete(studentId).subscribe(() => {
      this.getAll();
      alert("Baja Exitosa!");
    }, error => {
      console.error(error);
      alert("Error: " + error.error.message);
    })
  }
}