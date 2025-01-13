import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'https://localhost:7206/api/Genres';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  createGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiUrl, genre, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteGenre(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}