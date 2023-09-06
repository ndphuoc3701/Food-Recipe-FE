import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ScheduleRecipeTimer } from '../model/schedule-recipe-timer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>;
  constructor(public userService: UserService, private router: Router) { }

  showSchedule: boolean = false;
  showSchedulePopup: boolean = false;
  receivedMessages: string[] = ['cc'];
  schedulations: ScheduleRecipeTimer[] = [new ScheduleRecipeTimer("Bò hầm", "/assets/icon/cooker.png", "29 phút trước"),
  new ScheduleRecipeTimer("Bò hầm rau thơm", "/assets/icon/cooker.png", "33 phút trước")];
  ngOnInit(): void {

    this.userService.isLoggedInSubject.subscribe(v => {
      this.userService.userInfo = v;
      console.log(this.userService.userInfo);

      if (v == null) {
        this.router.navigate(['/login']);
      }
      else {
        this.router.navigate(['/']);
      }
    })
    this._connect();
    let date: Date = new Date("2023-08-28 23:50");
    console.log(new Date().getSeconds() - date.getSeconds());

  }

  webSocketEndPoint: string = 'http://localhost:8080/hello';
  topic: string = `/queue/${this.userService.userInfo?.id}/notification`;
  stompClient!: Stomp.Client;

  _connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, frame => {
      _this.stompClient.subscribe(_this.topic, payload => {
        _this.onMessageReceived(payload);
        this.showSchedulePopup = true;
        setTimeout(() => this.showSchedulePopup = false, 5000);
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
    let scheduleRecipeTimer: ScheduleRecipeTimer = JSON.parse(message.body);
    this.playAudio();
  }

  playAudio() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
  }

  logOut() {
    this.userService.isLoggedInSubject.next(null);
  }

}
