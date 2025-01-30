import { Component, Input} from '@angular/core';
import { CardButtonComponent } from '../../shared/card-button/card-button.component';

@Component({
  selector: 'app-film-card',
  standalone:true,
  imports: [CardButtonComponent],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss'
})
export class FilmCardComponent {
  @Input() movie: any;
}
