import { Component } from '@angular/core';
import { DesktopNavigationComponent } from '../desktop-navigation/desktop-navigation.component';
import { MobileNavigationComponent } from '../mobile-navigation/mobile-navigation.component';

@Component({
  selector: 'app-navigation',
  imports: [
    DesktopNavigationComponent,
    MobileNavigationComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {

}
