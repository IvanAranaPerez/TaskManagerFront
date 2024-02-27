import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User.interface';
import { TasksService } from '../../services/tasks.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styles: ``
})
export class UserPageComponent implements OnInit {

  users: User[] = [];
  newUserName: string = '';
  newProfilePic: string = '';
  selectedUserId: string = '';

  constructor( private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.tasksService.getUsers().subscribe(
      (users: any) => {
        console.log(users)
        this.users = users.data;

      }
    )
  }

  createUser() {
    if (this.newUserName.trim() !== '' && this.newProfilePic?.trim() == '') {
      const newUser = {
        name: this.newUserName,
        pic: this.newProfilePic
      };
      this.tasksService.createUser(newUser).subscribe(
        () => {
          this.getAllUsers();
          this.newUserName = '';
          this.newProfilePic = '';
        },
        (error) => {
          console.error('Error al crear usuario:', error);
        }
      );
    } else {
      console.warn('El nombre y la URL del usuario no pueden estar vacíos');
    }
  }

  deleteUser(userId: string) {
    this.tasksService.deleteUser(userId).subscribe(
      () => {
        this.getAllUsers();
      },
      (error) => {
        console.error('Error al eliminar al usuario:', error)
      }
    );
  }

  getUser(userId: string, buttonId: string) {

    if (buttonId === 'userTasks'){
      console.log('Tareas del usuario con ID:', userId);
      this.router.navigate(['taskManager/userTasks/', userId]);
    } else if (buttonId === 'userUpdate'){
      console.log('Editando usuario con ID:', userId);
      this.router.navigate(['taskManager/editUser/', userId]);
    }
  }

  // editUser() {
  //   const userId = '65d4ec423fc4d75a90c473d2'; // Coloca aquí un valor de userId válido
  //   this.router.navigate([`/editUser/${userId}`]);
  // }

  // getUserId(userId: string) {
  //   this.selectedUserId = userId;
  //   console.log('User:', this.selectedUserId)
  // }

}
