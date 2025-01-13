import { Injectable } from '@angular/core';
import { Hall } from '../models/hall';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = 'https://localhost:7206/api/Halls';

  constructor(private http: HttpClient) { }

  getAllHalls(): Observable<Hall[]> {
    return this.http.get<Hall[]>(this.apiUrl);
  }

  getHallById(id: number): Observable<Hall> {
    return this.http.get<Hall>(`${this.apiUrl}/${id}`);
  }

  deleteHall(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}