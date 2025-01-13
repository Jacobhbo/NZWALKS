import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../service/movie.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [MovieService],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieList: Movie[] = [];
  movieForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    durationMinutes: new FormControl('', Validators.required),
    rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
    releaseDate: new FormControl('', Validators.required)
  });

  constructor(private service: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const newMovie = this.movieForm.value;
      this.service.createMovie(newMovie).subscribe({
        next: (response) => {
          console.log('Movie created successfully:', response);
          this.loadMovies();
          this.movieForm.reset();
        },
        error: (error) => {
          console.error('Error creating movie:', error);
        }
      });
    }
  }

  deleteMovie(id: number): void {
    this.service.deleteMovie(id).subscribe({
      next: () => {
        console.log('Movie deleted successfully');
        this.loadMovies();
      },
      error: (error) => console.error('Error deleting movie:', error)
    });
  }

  private loadMovies(): void {
    this.service.getAllMovies().subscribe({
      next: (data) => {
        console.log('Movies loaded:', data);
        this.movieList = data;
      },
      error: (error) => console.error('Error loading movies:', error)
    });
  }
}