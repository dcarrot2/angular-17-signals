import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class OldUserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private searchTermSubject = new BehaviorSubject<string>('');

  users$ = this.usersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  filteredUsers$ = combineLatest([this.users$, this.searchTermSubject]).pipe(
    map(([users, searchTerm]) =>
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<void> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<User[]>('http://localhost:8080/users').pipe(
      map((users) => {
        this.usersSubject.next(users);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to fetch users');
        this.loadingSubject.next(false);
        return of(void 0);
      })
    );
  }

  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  addUser(user: User) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }

  removeUser(id: number) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next(currentUsers.filter((user) => user.id !== id));
  }
}
