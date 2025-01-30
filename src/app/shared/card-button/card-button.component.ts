import { Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card-button',
  imports: [],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss'
})

export class CardButtonComponent {
  @Input() text: string = 'Подробнее';
}