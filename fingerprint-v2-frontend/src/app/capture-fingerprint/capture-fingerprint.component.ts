import { StepperService } from './../stepper.service';
import { DataProviderService } from './../data-provider.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as intermediateData from '../example_json.json'

@Component({
  selector: 'app-capture-fingerprint',
  templateUrl: './capture-fingerprint.component.html',
  styleUrls: ['./capture-fingerprint.component.css']
})
export class CaptureFingerprintComponent implements OnInit {

  @Output() changeAppStateEmitter = new EventEmitter()

  heading:string = "Capture First Fingerprint"
  continueBtnText:string = "Capture Next Fingerprint"

  //Used while capturing first and second fingerprints:
  firstFingerCaptured:boolean = false //boolean to keep track of the number of fingerprints captured
  captured:boolean = false; //boolean to change UI state when fingerprint captured
  capturedFingerprint = {image:"", quality:null} // use capturedFingerprint.image in html captured block.
  badQuality:boolean = false // boolean to check if the quality of captured finger in bad
  badFingerprint = {image:"", quality:null} // object to store bad quality data to show in the UI 
  liveView:string = "" // set of string corresponding to the live preview image data

  interData: any = (intermediateData as any).default //JSON data for intermediate images
  hasInterFingerImgs: boolean = false
  hasInterRightThumb: boolean = false
  hasInterLeftThumb: boolean = false

  // Used during result screen
  ShowFinal:boolean = false // used after both fingerprints are captured
  first = {image: "", quality: null}
  second = {image: "", quality: null}
  showThankYouMsg: boolean = false // used in case captured fingerprints are accepted and task ends

  constructor(private dataProvider: DataProviderService, private stepperService: StepperService) { }

  ngOnInit(): void {
    this.dataProvider.getData().subscribe((res:string) => {
      let data = JSON.parse(res)
     
      this.liveView = data.params.imageDataPng

      // in case the quality is too low:
      if((data.method=="updateState" && data.params.state.stateName=="showFirstFingerBadQuality") || 
          (data.method=="updateState" && data.params.state.stateName=="showSecondFingerBadQuality"))
      {
        this.badQuality = true
        if(this.firstFingerCaptured == false)
        {
          this.badFingerprint.image = data.params.state.firstFinger.fingerImagePng
          this.badFingerprint.quality = data.params.state.firstFinger.fingerQuality
        }
        else
        {
          this.badFingerprint.image = data.params.state.secondFinger.fingerImagePng
          this.badFingerprint.quality = data.params.state.secondFinger.fingerQuality
        }
      }

      // in case first fingerprint was captured successfully:
      else if(data.method=="updateState" && data.params.state.stateName=="waitForSecondFingerStart")
      {
        this.capturedFingerprint.image = data.params.state.firstFinger.fingerImagePng
        this.capturedFingerprint.quality = data.params.state.firstFinger.fingerQuality
        this.captured = true
      }

      // in case second fingerprint was captured successfully:
      else if(data.method=="updateState" && data.params.state.stateName=="showResultScreen")
      {
        this.capturedFingerprint.image = data.params.state.secondFinger.fingerImagePng
        this.capturedFingerprint.quality = data.params.state.secondFinger.fingerQuality
        this.captured = true

        this.first.image = data.params.state.firstFinger.fingerImagePng
        this.first.quality = data.params.state.firstFinger.fingerQuality
        this.second.image = data.params.state.secondFinger.fingerImagePng
        this.second.quality = data.params.state.secondFinger.fingerQuality
      }
    })

    // conditions for Intermediate images to be shown afetr each capture:
    if(this.interData.hasOwnProperty("IntermediateFingerprintImages")){this.hasInterFingerImgs = true}
    if(this.interData.hasOwnProperty("IntermediateRightThumb")){ this.hasInterRightThumb = true}
    if(this.interData.hasOwnProperty("IntermediateLeftThumb")){this.hasInterLeftThumb = true}
  }

  // Different methods passing appropriate messages to backend:
  capture(){
      let proceedMsg = {"jsonrpc": "2.0", "method": "startCapture"}
      this.dataProvider.sendMsg(proceedMsg)    
  }

  // in case when captured fingerprint is accepted:
  continue(){
    if(this.firstFingerCaptured == false){
      this.firstFingerCaptured = true
      this.stepperService.stepUpSend("next") // service to increment the stepper
      this.heading = "Capture Second Fingerprint"
      this.continueBtnText = "Proceed to Result Screen"
      this.capturedFingerprint = {image:"", quality:null}
      this.captured = false
    }
    else{
      this.capturedFingerprint = {image:"", quality:null}
      this.stepperService.stepUpSend("next")
      this.ShowFinal = true
    }
  }

  // in case of bad quality or forced recapture
  reCapture(){
    if(this.badQuality == true){
      let reCaptureMsg = {"jsonrpc": "2.0", "method": "recaptureCurrentFinger"}
      this.dataProvider.sendMsg(reCaptureMsg)
      this.badQuality = false
      this.capturedFingerprint = {image:"", quality:null}
    }
    else{
      let reCaptureMsg = {"jsonrpc": "2.0", "method": "recaptureCurrentFinger"}
      this.dataProvider.sendMsg(reCaptureMsg)
      this.capturedFingerprint = {image:"", quality:null}
      this.captured = false
    }
  }

  // to restart the entire process from the result screen
  reStart(){
    let restartMsg = {"jsonrpc": "2.0", "method": "restartCapture"}
    this.dataProvider.sendMsg(restartMsg)
    this.stepperService.stepUpSend("reStartCapture")
    this.captured = false
    this.firstFingerCaptured = false
    this.ShowFinal = false
    this.heading = "Capture First Fingerprint"
    this.continueBtnText = "Capture Next Fingerprint"
    this.changeAppStateEmitter.emit("CaptureFingerprint")      
  }

  // to end the task and save the captured fingerprints
  accept(){
    let completeMsg = {"jsonrpc": "2.0", "method": "acceptCapture"}
    this.dataProvider.sendMsg(completeMsg)
    this.stepperService.stepUpSend("Accepted")
    this.dataProvider.closeSocket()
    this.showThankYouMsg = true   
  }

  cancelTask(){
    this.stepperService.stepUpSend("cancelTask")
    this.captured = false
    this.firstFingerCaptured = false
    this.ShowFinal = false
    this.heading = "Capture First Fingerprint"
    this.continueBtnText = "Capture Next Fingerprint"
    this.changeAppStateEmitter.emit("Connect")
  }
}
