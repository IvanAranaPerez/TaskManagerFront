import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Observable, catchError, switchMap, tap } from 'rxjs';
import { Tasks } from '../../interfaces/Task.interface';

@Component({
  selector: 'app-edit-tasks-page',
  templateUrl: './edit-tasks-page.component.html',
  styles: ``
})
export class EditTasksPageComponent implements OnInit {

  task: Tasks = {_id: '', task: '', userId:''};

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.getTaskById(params['id'])),
      catchError(error => {
        console.error('Error fetching task: ', error);
        throw error;
      })
    ).subscribe({
      next: response => {
        if (response && response.data && response.data.tarea) {
          this.task = response.data.tarea;
        } else {
          console.error('La respuesta del servidor no incluye la tarea');
        }
      },
      error: error => {
        console.error('Error fetching task:', error);
      }
    });
  }

  getTaskById(taskId: string): Observable<any> {
    return this.tasksService.getOneTaskById(taskId).pipe(
      tap(task => {
        console.log('ID de la tarea recuperada:', task._id);
      }),
      catchError(error => {
        console.error('Error fetching task:', error);
        throw error;
      })
    );
  }

  updateTask(): void {
    if (!this.task._id) {
      console.error('El ID de la tarea es inválido');
      return;
    }

    // Verifica si userId está definido antes de asignarlo
    const userId: string | undefined = this.task.userId ? this.task.userId : undefined;

    if (!userId) {
      console.error('El ID de usuario es inválido');
      return;
    }

    const taskToUpdate: { task: string, userId: string } = {
      task: this.task.task,
      userId: userId // Aquí userId es garantizado que es una cadena válida
    };

    this.tasksService.updateTask(this.task._id, taskToUpdate)
      .subscribe(
        (updatedTask: Tasks) => {
          console.log('Tarea actualizada:', updatedTask);
          this.router.navigate(['taskManager/userTasks']);
        },
        (error) => {
          console.log('Error al actualizar la tarea:', error);
        }
      );
  }

}
