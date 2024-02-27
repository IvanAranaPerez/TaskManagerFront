import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from '../../interfaces/Task.interface';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styles: ``
})
export class TaskPageComponent implements OnInit {

  tasks: Tasks [] = [];
  users: User[] = [];
  newTask: string = '';

  constructor (private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.getAllUsers();
  }

  getAllTasks() {
    this.tasksService.getTasks().subscribe(
      (tasks: any) => {
        console.log(tasks);
        this.tasks = tasks.data;

      }
    )
  }

  getAllUsers() {
    this.tasksService.getUsers().subscribe(
      (users: any) => {
        console.log(users)
        this.users = users.data;

      }
    )
  }

  onUserSelect(event: any): void {
    const userId = event?.target?.value;
    if (userId) {
      const selectedUser = this.users.find(user => user._id === userId);
      console.log('Usuario seleccionado:', selectedUser);
    }
  }

  createNewUserTask(): void {
    const inputTask = (document.getElementById('inputTask') as HTMLInputElement).value;
    const selectUser = (document.getElementById('selectUser') as HTMLSelectElement).value;

    if (inputTask && selectUser) {
      this.tasksService.createTask(inputTask, selectUser).subscribe(
        (newTask: Tasks) => {
          console.log('Nueva tarea creada:', newTask);
          // Aquí puedes actualizar la lista de tareas si lo deseas
          this.getAllTasks();
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    } else {
      console.warn('Por favor ingresa una tarea y selecciona un usuario');
    }
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

}
