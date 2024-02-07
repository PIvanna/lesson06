import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private users: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'qwerty'
    }
  ];

  constructor() { }

  getUsers(): Array<IUser> {
    return this.users;
  }

  

  addUser(user: IUser): void {
    this.users.push(user);
  }

  updateDiscount(discount: IUser, id: number): void {
    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1, discount);
  }

  deleteDiscount(id: number): void {
    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
  }
}
