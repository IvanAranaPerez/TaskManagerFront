import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { User } from '../../interfaces/User.interface';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { error } from 'console';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styles: ``
})
export class EditUserPageComponent implements OnInit {

  user: User = { _id: '', name: '', pic: '' };

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.getUserById(params['id'])),
      catchError(error => {
        console.error('Error fetching user:', error);
        throw error;
      })
    ).subscribe({
      next: user => {
        this.user = user.data;
        console.log('Datos del usuario:', this.user);
      },
      error: error => {
        console.error('Error fetching user:', error);
      }
    });
  }

  getUserById(userId: string): Observable<any> {
    return this.tasksService.getUserById(userId).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        throw error;
      })
    );
  }

  updateUser(): void {
    this.tasksService.updateUser(this.user._id!,{ name: this.user.name, pic: this.user.pic })
    .subscribe(
      (updatedUser: User) => {
        console.log('Usuario actulaizado:', updatedUser);
        this.router.navigate(['taskManager/users']);
      },
      (error) => {
        console.log('Error al actualizar usuario:', error);
      }
    );
  }

}
