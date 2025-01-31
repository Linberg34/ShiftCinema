import { Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card-button',
  imports: [],
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss','../../environment/_variables.scss'],
})

export class CardButtonComponent {
  @Input() text: string = 'Подробнее';
}