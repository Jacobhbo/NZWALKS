import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7206/api/auth'; // Base API URL for authentication

  constructor(private http: HttpClient) {}

  /**
   * Logs in the user with provided credentials.
   * @param credentials Object containing username and password.
   * @returns Observable emitting a JWT token as a string.
   */
  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error); // Propagate error to the caller
      })
    );
  }

  /**
   * Checks if the user is currently logged in by verifying if a JWT token exists in localStorage.
   * @returns True if a JWT token is present, otherwise false.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  /**
   * Logs out the user by removing the JWT token from localStorage.
   */
  logout(): void {
    localStorage.removeItem('jwt');
  }
}
