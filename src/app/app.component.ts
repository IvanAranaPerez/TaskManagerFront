import { Component } from '@angular/core';
import { TasksService } from './task-app/services/tasks.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskManagerFront';
  constructor (private tasksService: TasksService) {}

  getAllUsers() {
    console.log('Hola')
    this.tasksService.getUsers().subscribe(
      (users) => {
        console.log(users)
        // this.users = users;
      }
    )
  }
}

