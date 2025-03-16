import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  host = 'http://localhost:3000/api';

  private http = inject(HttpClient);

  list(): Observable<Movie[]> {
    return this.http.get(`${this.host}/movies`).pipe(map((res) => res as Movie[]));
  }
  add(m: Omit<Movie, 'id'>) {
    return this.http.post(`${this.host}/movies`, m);
  }
  delete(id: number) {
    return this.http.delete(`${this.host}/movies/${id}`);
  }
}