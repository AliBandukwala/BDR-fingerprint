import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appState = "SelectFingers"

  // Changes the app state which changes the UI accordingly
  changeAppState(newState){
    this.appState = newState
  }
}
