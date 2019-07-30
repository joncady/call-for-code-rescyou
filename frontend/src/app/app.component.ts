import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'disaster-support-app';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.updateCurrentUser();
  }
}
