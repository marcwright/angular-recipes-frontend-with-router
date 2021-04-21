import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-recipes-frontend';
  currentUser: string;

  constructor(private userService: UserService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {

      this.currentUser = this.userService.currentUser;
      console.log(this.currentUser);
  }
}
