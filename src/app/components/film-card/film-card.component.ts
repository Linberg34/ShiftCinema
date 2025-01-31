import { AfterViewInit, Component, Input,ElementRef,ChangeDetectorRef,OnInit } from '@angular/core';
import { CardButtonComponent } from '../../shared/card-button/card-button.component';
import { Film } from '../../models/film.model';
import { CommonModule } from '@angular/common';


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
  isMarquee:boolean =false;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const titleElement = this.el.nativeElement.querySelector('.cardTitle');
    if (titleElement.scrollWidth > titleElement.clientWidth) {
      this.isMarquee = true;
      this.cdr.detectChanges(); // Уведомляем Angular о необходимости обновления
    }
  }

  getRatingStars(rating: string): number {
    const numericRating = parseFloat(rating);
    return (numericRating / 2);
  }

  getStarFillPercentage(index: number): number {
    const rating = this.getRatingStars(this.movie.userRatings.kinopoisk);
    const fill = rating - index;

    if (fill >= 1) {
      return 100;
    } else if (fill > 0) {
      return fill * 100;
    } else {
      return 0;
    }
  }

  ageRatingMap: { [key: string]: string } = {
    'G': '0+',
    'PG': '6+',
    'PG-13': '12+',
    'R': '16+',
    'NC17': '18+'
  };

  getAgeRating(ageRating: string): string {
    
    return this.ageRatingMap[ageRating] || 'N/A';
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