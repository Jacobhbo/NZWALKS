import { Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { GenreComponent } from './components/genre/genre.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'genre', component: GenreComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent }
];