import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userCount: number = 0;
  movieCount: number = 0;
  movieList: Movie[] = [];

  constructor(
    private userService: UserService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.loadCounts();
  }

  private loadCounts() {
    this.userService.getall3().subscribe(users => {
      this.userCount = users.length;
    });

    this.movieService.getAllMovies().subscribe(movies => {
      this.movieCount = movies.length;
    });
  }

  public loadMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movieList = data.map(movie => ({
          ...movie,
          imageUrl: 'pictures/image.png'
        }));
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      }
    });
  }
}