import { Component } from '@angular/core';
import { User, UserService } from './users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
})
export class UserListComponent {
  @Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
  })
  users: ReturnType<UserService['getUsers']>;
  loading: ReturnType<UserService['isLoading']>;
  error: ReturnType<UserService['getError']>;
  filteredUsers: UserService['filteredUsers'];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
    this.loading = this.userService.isLoading();
    this.error = this.userService.getError();
    this.filteredUsers = this.userService.filteredUsers;
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.fetchUsers().subscribe();
  }

  addUser(user: User) {
    this.userService.addUser(user);
  }

  removeUser(id: number) {
    this.userService.removeUser(id);
  }

  updateSearch(term: string) {
    this.userService.updateSearchTerm(term);
  }
}
