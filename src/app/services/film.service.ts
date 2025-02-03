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

  getFilmDetails(filmId: number): Observable<Film> {
    return this.http.get<{ success: boolean; reason: string; film: Film }>(
      `${this.apiBaseURL}/cinema/film/${filmId}`
    ).pipe(
      map(response => {
        if (!response.success || !response.film) {
          throw new Error(response.reason || 'Ошибка загрузки фильма');
        }
  
        return {
          ...response.film,
          img: `${this.apiBaseURL}${response.film.img}`,
        };
      })
    );
  }

  getSchedule(filmId: string): Observable<any> {
    const url = `${this.apiBaseURL}/cinema/film/${filmId}/schedule`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.reason || 'Ошибка при загрузке расписания');
        }
        return response.schedules; 
      })
    );
  }
  
}
