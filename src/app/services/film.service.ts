import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private apiBaseURL = 'https://shift-intensive.ru/api'; 

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<{ films: Film[] }>(`${this.apiBaseURL}/cinema/today`).pipe(
      map(response => {
        return response.films.map(film => ({
          ...film,
          img: `${this.apiBaseURL}${film.img}`, 
        }));
      })
    );
  }
}
