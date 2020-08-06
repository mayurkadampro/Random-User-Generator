import { Component, OnInit } from '@angular/core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import {Howl} from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'random-user';
  redo = faRedo;
  UserInfo: any = [];
  isLoading: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  spinnerConfig = {
    placement: SPINNER_PLACEMENT.block_ui,
    animation: SPINNER_ANIMATIONS.spin_3,
    size: "3rem",
    color: "#1574b3"
};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.randomApiCall().then((response) => {
      // TODO for in future operation with data
    })
  }

  playSound() {
    var sound = new Howl({
      src: ["./assets/confirm_delivery.mp3"]
    });
     
    sound.play();
  }

  randomApiCall() {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      this.http.get(environment.randomAPIUrl, this.httpOptions).subscribe(
        (data) => {
          this.playSound()
          this.UserInfo = data['results'][0];
          resolve('Sucesss');
          this.isLoading = false;
        },
        (err) => {
          resolve('Failed');
          this.isLoading = true
        }
      );
    });
  }
}
