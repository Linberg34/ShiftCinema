import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss', '../../environment/_variables.scss'],
})
export class CardButtonComponent {
  @Input() text: string = '';
  @Input() route: string = '';
}
