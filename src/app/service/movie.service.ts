import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://localhost:7206/api/Movies';

  constructor(private http: HttpClient) { }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie).pipe(
      tap(response => console.log('Movie created:', response))
    );
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      tap(movies => console.log('Movies fetched:', movies))
    );
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        tap(() => console.log('Movie deleted:', id))
    );
  }
}