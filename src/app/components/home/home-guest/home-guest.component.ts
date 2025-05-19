import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-guest',
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home-guest.component.html',
  styleUrl: './home-guest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeGuestComponent {

}
