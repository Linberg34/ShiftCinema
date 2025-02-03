import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Film, Schedule } from '../../models/film.model';
import { getStarFillPercentage,getAgeRating} from '../../utils/utils.rating';
import { CardButtonComponent } from '../../shared/card-button/card-button.component';

@Component({
  selector: 'app-detailed-movie',
  standalone: true,
  imports: [HeaderComponent, CommonModule,RouterModule, CardButtonComponent], 
  templateUrl: './detailed-movie.component.html',
  styleUrls: ['./detailed-movie.component.scss']
})


export class DetailedMovieComponent implements OnInit {
  @Input() movie!: Film;
  releaseYear!: string;
  filmId!: number;
  filmDetails!: Film;
  schedule: Schedule[] = []; 
  selectedDate: string = ''; 
  selectedSeance: { hallName: string; time: string } | null = null;


  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService 
  ) {}

  ngOnInit(): void {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.filmId) {
      this.filmService.getFilmDetails(this.filmId).subscribe({
        next: (film) => {
          this.filmDetails = film;
          this.loadSchedule();
        },
        error: (err) => console.error('Ошибка при загрузке деталей фильма:', err),
      });
    }
  }
  loadSchedule() {
    this.filmService.getSchedule(this.filmId.toString()).subscribe({
      next: (data) => {
        this.schedule = data;
        console.log(data);
        if (this.schedule.length > 0) {
          this.selectedDate = this.schedule[0].date; 
        }
      },
      error: (err) => console.error('Ошибка при загрузке расписания:', err),
    });
  }

  selectSeance(hallName: string, time: string): void {
    this.selectedSeance = { hallName, time };
  }
  
  isSelectedSeance(hallName: string, time: string): boolean {
    return this.selectedSeance?.hallName === hallName && this.selectedSeance?.time === time;
  }
  

  groupSeancesByHall() {
    const seances = this.getSeancesForSelectedDate();
    const grouped: { hallName: string; times: string[] }[] = [];
  
    seances.forEach((seance) => {
      const translatedHallName = this.translateHallName(seance.hall.name);
  
      const hall = grouped.find((g) => g.hallName === translatedHallName);
      if (hall) {
        hall.times.push(seance.time);
      } else {
        grouped.push({ hallName: translatedHallName, times: [seance.time] });
      }
    });
  
    return grouped;
  }
  
  translateHallName(hallName: string): string {
    const hallTranslations: { [key: string]: string } = {
      Red: 'Красный',
      Green: 'Зелёный',
      Blue: 'Синий',
    };
  
    return hallTranslations[hallName] || hallName;
  }
  



  selectDate(date: string): void {
    this.selectedDate = date;
  }
  
  isSelectedDate(date: string): boolean {
    return this.selectedDate === date;
  }

  getSeancesForSelectedDate() {
    return this.schedule.find((day) => day.date === this.selectedDate)?.seances || [];
  }

  getStarFill(index: number): number {
    if (this.filmDetails?.userRatings?.kinopoisk) {
      return getStarFillPercentage(this.filmDetails.userRatings.kinopoisk, index);
    }
    return 0;
  }
  getAgeRating(ageRating: string): string {
    return getAgeRating(ageRating);
  }
}
