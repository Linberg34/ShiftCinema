import { AfterViewInit, Component, Input,ElementRef,ChangeDetectorRef,OnInit } from '@angular/core';
import { CardButtonComponent } from '../../shared/card-button/card-button.component';
import { Film } from '../../models/film.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute} from '@angular/router';


import {
  getRatingStars,
  getStarFillPercentage,
  getAgeRating
} from '../../utils/utils.rating';


@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CardButtonComponent, CommonModule],
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss', '../../environment/_variables.scss']
})
export class FilmCardComponent implements OnInit, AfterViewInit {
  @Input() movie!: Film;
  releaseYear!: string;
  isMarquee: boolean = false;
  filmId!: string;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    const titleElement = this.el.nativeElement.querySelector('.cardTitle');
    if (titleElement.scrollWidth > titleElement.clientWidth) {
      this.isMarquee = true;
      this.cdr.detectChanges(); 
    }
  }

  getRatingStars(rating: string): number {
    return getRatingStars(rating);
  }

  getStarFillPercentage(index: number): number {
    return getStarFillPercentage(this.movie.userRatings.kinopoisk, index);
  }

  getAgeRating(ageRating: string): string {
    return getAgeRating(ageRating);
  }

  ngOnInit(): void {
    if (this.movie.releaseDate) {
      const match = this.movie.releaseDate.match(/\d{4}/);
      if (match) {
        this.releaseYear = match[0];
      } else {
        console.error('Год не найден в строке:', this.movie.releaseDate);
      }
    }
  }
}
