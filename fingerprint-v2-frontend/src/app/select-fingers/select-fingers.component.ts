import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepperService } from './../stepper.service';

@Component({
  selector: 'app-select-fingers',
  templateUrl: './select-fingers.component.html',
  styleUrls: ['./select-fingers.component.css']
})
export class SelectFingersComponent implements OnInit {

  constructor(private stepper: StepperService) { }

  @Output() changeAppStateEmitter = new EventEmitter()

  ngOnInit(): void {}


  FlatFingersLeft = [
    {name:"Left Little", code:10, selected:false, imgSrc:"left_little", imgVis:false},
    {name:"Left Ring", code:9, selected:false, imgSrc:"left_ring", imgVis:false},
    {name:"Left Middle", code:8, selected:false, imgSrc:"left_middle", imgVis:false},
    {name:"Left Index", code:7, selected:false, imgSrc:"left_index", imgVis:false},
    {name:"Left Thumb", code:6, selected:false, imgSrc:"left_thumb", imgVis:false},
    {name: "All Left Fingers", code:14, selected:false, imgSrc:"left_all", imgVis:false},
  ]

  bothThumbs = {name:"Both Thumbs", code:15, selected:false, imgSrc:"both_thumb", imgVis:false}

  FlatFingersRight = [
    {name:"Right Thumb", code:1, selected:false, imgSrc:"right_thumb", imgVis:false},
    {name:"Right Index", code:2, selected:false, imgSrc:"right_index", imgVis:false},
    {name:"Right Middle", code:3, selected:false, imgSrc:"right_middle", imgVis:false},
    {name:"Right Ring", code:4, selected:false, imgSrc:"right_ring", imgVis:false},
    {name:"Right Little", code:5, selected:false, imgSrc:"right_little", imgVis:false},
    {name: "All Right Fingers", code:13, selected:false, imgSrc:"right_all", imgVis:false},
  ]

  RolledFingers = [
    {name:"Left Little", code:1, selected:false, imgSrc:"rolled_left_little", imgVis:false},
    {name:"Left Ring", code:2, selected:false, imgSrc:"rolled_left_ring", imgVis:false},
    {name:"Left Middle", code:3, selected:false, imgSrc:"rolled_left_middle", imgVis:false},
    {name:"Left Index", code:4, selected:false, imgSrc:"rolled_left_index", imgVis:false},
    {name:"Left Thumb", code:5, selected:false, imgSrc:"rolled_left_thumb", imgVis:false},
    {name:"Right Thumb", code:6, selected:false, imgSrc:"rolled_right_thumb", imgVis:false},
    {name:"Right Index", code:7, selected:false, imgSrc:"rolled_right_index", imgVis:false},
    {name:"Right Middle", code:8, selected:false, imgSrc:"rolled_right_middle", imgVis:false},
    {name:"Right Ring", code:9, selected:false, imgSrc:"rolled_right_ring", imgVis:false},
    {name:"Right Little", code:10, selected:false, imgSrc:"rolled_right_little", imgVis:false},
  ]

  selectedOption:string
  
  fingerOptions = [
    {name:"Flat Finger Options", value:"flat"},
    {name:"Rolled Finger Options", value:"rolled"}
  ]

  selectedFingerCodes= []

  onSelectionFinished(){
    this.selectedFingerCodes= []

    this.FlatFingersLeft.map(finger => {
      if(finger.selected){
        this.selectedFingerCodes.push(finger.code)
      }
    })

    if(this.bothThumbs.selected){
      this.selectedFingerCodes.push(this.bothThumbs.code)
    }

    this.FlatFingersRight.map(finger => {
      if(finger.selected){
        this.selectedFingerCodes.push(finger.code)
      }
    })

    this.RolledFingers.map(finger => {
      if(finger.selected){
        this.selectedFingerCodes.push(finger.code)
      }
    })
    this.stepper.stepUpSend("next")
    this.changeAppStateEmitter.emit("Connect")
    console.log(this.selectedFingerCodes) 
  }
}
