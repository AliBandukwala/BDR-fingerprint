import { DataProviderService } from './data-provider.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CaptureFingerprintComponent } from './capture-fingerprint/capture-fingerprint.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './stepper/stepper.component';
import {FormsModule} from '@angular/forms'
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips'
import {MatRadioModule} from '@angular/material/radio'
import { ConnectHdcsComponent } from './connect-hdcs/connect-hdcs.component';
import { SelectFingersComponent } from './select-fingers/select-fingers.component';

@NgModule({
  declarations: [
    AppComponent,
    CaptureFingerprintComponent,
    StepperComponent,
    ConnectHdcsComponent,
    SelectFingersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatChipsModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
