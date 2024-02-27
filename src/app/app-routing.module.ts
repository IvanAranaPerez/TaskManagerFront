import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserPageComponent } from './task-app/pages/edit-user-page/edit-user-page.component';
import { UserTasksPageComponent } from './task-app/pages/user-tasks-page/user-tasks-page.component';

const routes: Routes = [
  {
    path: 'taskManager',
    loadChildren: () => import('./task-app/task-app.module').then(m => m.TaskAppModule)
  },
  {
    path: '**',
    redirectTo: 'taskManager'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
