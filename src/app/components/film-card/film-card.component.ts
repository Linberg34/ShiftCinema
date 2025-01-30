import { Component, Input} from '@angular/core';
import { CardButtonComponent } from '../../shared/card-button/card-button.component';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-card',
  standalone:true,
  imports: [CardButtonComponent],
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss','../../environment/_variables.scss']
})
export class FilmCardComponent {
  @Input() movie!: Film;
}
