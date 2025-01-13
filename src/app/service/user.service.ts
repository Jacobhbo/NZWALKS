import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// this is our entry to API
export class UserService {



// URL

url: string = "https://localhost:7206/api/Users";
//JSON eller XML - formatters
// GET, POST, PUT, DELETE


// version 1 -Hardcoded
getall(): User[] {
  return [
    { userId: 12, firstName: "Palle", lastName: "Lone", email: "Numse@hejsmed12.dk", postalCodeId: 1234 }
  ];
}


addUser(newUser: User): Observable<User> {
  return this.http.post<User>(this.url, newUser).pipe(
    tap((data) => console.log('User added:', data))
  );
}


 userList: User[] = [
  { userId: 12, firstName: "Palle", lastName: "Lone", email: "Numse@hejsmed12.dk", postalCodeId: 1234 }
];

  getall2():User []{return this.userList;}

  getall3(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((data) => console.log('Fetched users in service:', data))
    );
  }

  getPostalCodes(): Observable<any[]> { 
    return this.http.get<any[]>('https://localhost:7206/api/PostalCodes').pipe(
      tap(data => console.log('Postal codes fetched:', data))
    );
  }



  delete(idToDelete: number): Observable<any> {
    return this.http.delete(`${this.url}/${idToDelete}`);
  }

//getall(): User[]{return this.userList;}


//getall(): User[]{return this.userList;}


//dependenci injection
constructor(private http:HttpClient) { }
}