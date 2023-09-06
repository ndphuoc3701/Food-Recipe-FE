import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from '../service/user.service';
import { ScheduleRecipeTimer } from '../model/schedule-recipe-timer';

@Component({
  selector: 'app-socket-test',
  templateUrl: './socket-test.component.html',
  styleUrls: ['./socket-test.component.css']
})
export class SocketTestComponent {
  @ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>;
  receivedMessages: string[] = ['cc'];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this._connect();
    this.playAudio();
    // let el: HTMLElement = this.myDiv.nativeElement;
    // el.click();
  }

  webSocketEndPoint: string = 'http://localhost:8080/hello';
  topic: string = `/queue/${this.userService.userInfo?.id}/notification`;
  stompClient!: Stomp.Client;

  _connect() {
    // let ws = new SockJS(this.webSocketEndPoint);
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, frame => {
      _this.stompClient.subscribe(_this.topic, payload => {
        _this.onMessageReceived(payload);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);

  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => { }
      );
    }
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  onMessageReceived(message: any) {

    this.receivedMessages.push(JSON.stringify(message.body));
    this.playAudio();
  }
  playAudio() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
  }

}
