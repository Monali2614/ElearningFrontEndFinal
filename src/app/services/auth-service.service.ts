import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


const NAV_URL= environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    // Initialize currentUserSubject with data from sessionStorage if available
    const userJson = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(userJson ? JSON.parse(userJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Method to get the current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Method to set the current user
  setCurrentUser(user: User): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // In AuthService
getCurrentUserEmail(): string | null {
  const user = this.getCurrentUser();
  return user ? user.email : null;
}


  // Method to clear the current user
  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}