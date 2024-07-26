import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OldUserService, User } from './old-users.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  filteredUsers$: Observable<User[]>;
  private subscription: Subscription = new Subscription();

  constructor(private userService: OldUserService) {
    this.users$ = this.userService.users$;
    this.loading$ = this.userService.loading$;
    this.error$ = this.userService.error$;
    this.filteredUsers$ = this.userService.filteredUsers$;
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUsers() {
    this.subscription.add(this.userService.fetchUsers().subscribe());
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userService.updateSearchTerm(input.value);
  }

  removeUser(id: number) {
    this.userService.removeUser(id);
  }
}
