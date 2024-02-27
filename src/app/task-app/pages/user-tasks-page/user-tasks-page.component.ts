import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User.interface';
import { Tasks } from '../../interfaces/Task.interface';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, switchMap } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-user-tasks-page',
  templateUrl: './user-tasks-page.component.html',
  styles: ``
})
export class UserTasksPageComponent implements OnInit{

  user: User = { _id: '', name: '', pic: '' };
  tasks: Tasks [] = [];

  constructor (private route: ActivatedRoute ,private tasksService: TasksService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.getUserNTasks(params['id'])),
      catchError(error => {
        console.error('Error fetching user:', error);
        throw error;
      })
    ).subscribe({
      next: ({ data: { usuario, tareas } }) => {
        this.user = usuario;
        this.tasks = tareas;
        console.log('Datos del usuario y tareas:', this.user, this.tasks);
      },
      error: error => {
        console.error('Error fetching user:', error);
      }
    });
  }

  getUserNTasks(userId: string): Observable<any> {
    return this.tasksService.getAllUserTasksById(userId).pipe(
      catchError(error => {
        console.error('Error fetching user tasks:', error);
        throw error;
      })
    )
  }

  deleteTaskById(taskId: string):void {
    this.tasksService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      },
      (error) => {
        console.error('Error al eliminar la tarea', error)
      }
    );
  }

  getUserTask(taskId: string) {
    console.log('Tarea seleccionada: ', taskId);
    this.router.navigate(['taskManager/editTasks/', taskId]);
  }



}
