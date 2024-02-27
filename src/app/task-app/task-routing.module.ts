import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { UserTasksPageComponent } from './pages/user-tasks-page/user-tasks-page.component';
import { EditTasksPageComponent } from './pages/edit-tasks-page/edit-tasks-page.component';

const routes: Routes = [
  {
    path:'users',
    component: UserPageComponent
  },
  {
    path:'tasks',
    component: TaskPageComponent
  },
  {
    path:'editUser/:id',
    component: EditUserPageComponent
  },
  {
    path:'userTasks/:id', //? Esta ruta debe llevar a la vista del usuario con todas sus tareas en base al id proporcionado por la ruta.
    component: UserTasksPageComponent
  },
  {
    path:'editTasks/:id', //? Esta ruta debe llevar a la vista de la tarea para editarla en base al id proporcionado por la ruta.
    component: EditTasksPageComponent
  },
  {
    path:'**',
    redirectTo: 'users'
  }
]

@NgModule({
  imports:[
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})

export class TaskRoutingModule {}
