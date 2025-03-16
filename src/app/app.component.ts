import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from './movies.service';


export interface Movie {
  id: number;
  name: string;
  director: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class AppComponent {
  movies: Movie[] = [];

  tmpMovie: Omit<Movie, 'id'> = {
    name: '',
    director: ''
  };

  movieService = inject(MoviesService);

  ngOnInit() {
    this.movieService.list().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  add(movie: AppComponent['tmpMovie']) {
    this.movieService.add(movie).subscribe(() => {
      this.tmpMovie.director = this.tmpMovie.name = '';

      this.movieService.list().subscribe((data: Movie[]) => {
        this.movies = data;
      });
    });
  }

  delete(id: number) {
    this.movieService.delete(id).subscribe((data) => {
      this.movieService.list().subscribe((data: Movie[]) => {
        this.movies = data;
      });
    });
  }
}