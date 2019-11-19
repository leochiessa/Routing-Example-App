import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {
  careerList = new Array<Career>();

  constructor(private careerService: CareerService) { }

  ngOnInit() {
    this.careerService.getAll().subscribe(response => {
      this.careerList = response;
    }, error => {
      console.error(error);
      alert("Error: " + error.error.message);
    })
  }
}