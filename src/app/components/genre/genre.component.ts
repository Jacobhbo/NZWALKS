import { Component, OnInit } from '@angular/core';
import { Genre } from '../../models/genre';
import { GenreService } from '../../service/genre.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [GenreService],
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genreList: Genre[] = [];
  genreForm: FormGroup = new FormGroup({
    genreName: new FormControl('', Validators.required)
  });

  constructor(private service: GenreService) {}

  ngOnInit() {
    this.loadGenres();
  }

  onSubmit(): void {
    if (this.genreForm.valid) {
      console.log('Form submitted:', this.genreForm.value);
      const newGenre: Genre = {
        genreId: 0,
        genreName: this.genreForm.value.genreName
      };

      this.service.createGenre(newGenre).subscribe({
        next: (response) => {
          console.log('Genre created:', response);
          this.loadGenres();
          this.genreForm.reset();
        },
        error: (error) => {
          console.error('Error creating genre:', error);
        }
      });
    }
  }

  private loadGenres() {
    this.service.getAllGenres().subscribe({
      next: (data) => {
        console.log('Loaded genres:', data);
        this.genreList = data;
      },
      error: (error) => console.error('Error loading genres:', error)
    });
  }

  deleteGenre(id: number): void {
    this.service.deleteGenre(id).subscribe({
      next: () => {
        console.log('Genre deleted successfully');
        this.loadGenres();
      },
      error: (error) => console.error('Error deleting genre:', error)
    });
  }
}