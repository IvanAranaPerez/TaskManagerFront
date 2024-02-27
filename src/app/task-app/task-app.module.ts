import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { UserTasksPageComponent } from './pages/user-tasks-page/user-tasks-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { EditTasksPageComponent } from './pages/edit-tasks-page/edit-tasks-page.component';



@NgModule({
  declarations: [
    UserPageComponent,
    TaskPageComponent,
    EditUserPageComponent,
    UserTasksPageComponent,
    EditTasksPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
    FormsModule,
  ]
})
export class TaskAppModule { }
