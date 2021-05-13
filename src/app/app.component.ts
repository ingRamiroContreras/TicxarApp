import { Component } from '@angular/core';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TicxarApp';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.populate();
  }
}
