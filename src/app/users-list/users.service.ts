import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSignal = signal<User[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  // Computed signal for filtered users
  filteredUsers = computed(() =>
    this.usersSignal().filter((user) =>
      user.name.toLowerCase().includes(this.searchTermSignal().toLowerCase())
    )
  );

  // Signal for search term
  private searchTermSignal = signal('');

  constructor(private http: HttpClient) {}

  // Getter for users
  getUsers() {
    return this.usersSignal;
  }

  // Getter for loading state
  isLoading() {
    return this.loadingSignal;
  }

  // Getter for error state
  getError() {
    return this.errorSignal;
  }

  // Method to fetch users
  fetchUsers(): Observable<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<User[]>('http://localhost:8080/users').pipe(
      map((users) => {
        this.usersSignal.set(users);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Failed to fetch users');
        this.loadingSignal.set(false);
        return of(void 0);
      })
    );
  }

  // Method to add a user
  addUser(user: User): void {
    this.usersSignal.update((users) => [...users, user]);
  }

  // Method to remove a user
  removeUser(id: number): void {
    this.usersSignal.update((users) => users.filter((user) => user.id !== id));
  }

  // Method to update search term
  updateSearchTerm(term: string): void {
    this.searchTermSignal.set(term);
  }
}
