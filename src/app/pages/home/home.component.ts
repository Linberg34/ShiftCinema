import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from '../../components/film-card/film-card.component';
import { Film } from '../../models/film.model';
import { OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { CardButtonComponent } from '../../shared/card-button/card-button.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FilmCardComponent, CardButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies: Film[] = []; 

  constructor(private filmService: FilmService) {} 

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (film) => {
        this.movies =film; 
      },
      error: (err) => console.error('Ошибка при загрузке фильмов:', err),
    });
  }
}