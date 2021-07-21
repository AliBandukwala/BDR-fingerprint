import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataProviderService {

  socket: WebSocket
 
  createSocket(){
    this.socket = new WebSocket("ws://localhost:9009"); 
    return new Observable((observer) => {
      this.socket.onmessage = (res) => observer.next(res.data);
      this.socket.onerror = (err) => observer.error(err);
      this.socket.onclose = () => observer.complete();
    })
  }

  getSocketStatus(){
    return this.socket.readyState
  }

  getData(){
    return new Observable((observer) => {
      this.socket.onmessage = (res) => observer.next(res.data);
      this.socket.onerror = (err) => observer.error(err);
      this.socket.onclose = () => observer.complete();
    })
  }

  sendMsg(msg)
  {
    if(this.socket.readyState === this.socket.OPEN){
      this.socket.send(JSON.stringify(msg))
    }
  }

  closeSocket(){
    this.socket.close()
  }

  constructor() { }
}
