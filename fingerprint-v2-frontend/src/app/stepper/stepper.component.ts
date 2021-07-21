import { MatStepper } from '@angular/material/stepper';
import { StepperService } from './../stepper.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;

  constructor(private stepperService: StepperService) { 
    this.stepperService.stepUpRecieve().subscribe(msg => {
      if(msg == "next"){
        this.stepper.selected.completed = true
        this.stepper.next()
      }
      else if(msg == "reset"){
        this.stepper.reset()
      }
      else if(msg == "reStartCapture"){
        this.stepper.reset()
        this.stepper.selected.completed = true
        this.stepper.next()
      }
      else if(msg == "Accepted"){
        this.stepper.selected.completed = true
      }       
      else if(msg == "cancelTask"){
        this.stepper.reset()
      }    
    })
  }

  ngOnInit(): void {
  }
}
