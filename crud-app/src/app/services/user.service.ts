import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Lucas', email: 'lucas@gmail.com', role: 'Engenheiro de FE', password: 'Ladmin' },
    { id: 2, name: 'Vinicius', email: 'vinicius@gmail.com', role: 'Engenheiro de BE', password: 'Vadmin' },
    { id: 3, name: 'Roberto', email: 'roberto@gmail.com', role: 'Analista de dados', password: 'Radmin' },
    { id: 4, name: 'Roberta', email: 'roberta@gmail.com', role: 'Líder Técnico', password: 'Radmin' }
  ];

  private usersUpdated = new Subject<User[]>();

  getUser(userId: number): User | undefined {
    return this.users.find(user => user.id === userId);
  }
  

  getUsersList() {
    return [...this.users];
  }

  getTotalUsersCount(): number {
    return this.users.length;
  }

  getUserCountByRole(role: string): number {
    return this.users.filter(user => user.role === role).length;
  }

  addUser(user: User) {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    this.usersUpdated.next([...this.users]);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersUpdated.next([...this.users]);
    }
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
    this.usersUpdated.next([...this.users]);
  }

  getUserUpdatedListener() {
    return this.usersUpdated.asObservable();
  }
}