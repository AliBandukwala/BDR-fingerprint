import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  private stepperSubject = new Subject<any>()

  stepUpSend(msg: string){
    this.stepperSubject.next(msg)
  }

  stepUpRecieve(){
     return this.stepperSubject.asObservable()
  }

  constructor() { }
}
