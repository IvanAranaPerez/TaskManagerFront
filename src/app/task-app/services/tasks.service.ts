import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/User.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tasks } from '../interfaces/Task.interface';

@Injectable({providedIn: 'root'})
export class TasksService {

  private readonly baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) {
    this.getUsers()
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/api/usersDB`);
  }

  createUser(newUser: {name: string}): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/api/usersDB/create`, newUser);
  }

  updateUser(userId: string, updatedUser: {name: string, pic: string}): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/api/usersDB/update/${userId}`, updatedUser);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.baseURL}/api/usersDB/delete/${userId}`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/api/usersDB/${userId}`);
  }

  //? Peticiones de tasks

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseURL}/api/task`);
  }

  getAllUserTasksById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/api/task/search/${userId}`);
  }

  deleteTask(taskId: string): Observable<Tasks> {
    return this.http.delete<Tasks>(`${this.baseURL}/api/task/delete/${taskId}`);
  }

  createTask(task: string, userId: string): Observable<Tasks> {
    const body = { task, userId };
    return this.http.post<Tasks>(`${this.baseURL}/api/task/create`, body);
  }

  getOneTaskById(taskId: string): Observable<Tasks> {
    return this.http.get<Tasks>(`${this.baseURL}/api/task/searchone/${taskId}`);
  }

  updateTask(taskId: string, updatedTask: {task: string, userId: string}): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.baseURL}/api/task/update/${taskId}`, updatedTask);
  }


}
