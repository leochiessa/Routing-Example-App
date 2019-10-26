import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career';
import { CareerAsyncService } from 'src/app/services/career-async.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {
  careerList = new Array<Career>();

  constructor(private careerService: CareerAsyncService) { }

  ngOnInit() {
    this.careerService.getAll().then(response => {
      this.careerList = response;
    }).catch(error => {
      console.error(error);
      alert("Error: " + error.error.message);
    });
  }
}