import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DesktopSearchFieldComponent } from '../desktop-search-field/desktop-search-field.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BurgerMenuComponent } from "../burger-menu/burger-menu.component";

@Component({
  selector: 'app-desktop-navigation',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    DesktopSearchFieldComponent,
    BurgerMenuComponent
],
  templateUrl: './desktop-navigation.component.html',
  styleUrl: './desktop-navigation.component.scss',
})
export class DesktopNavigationComponent {
  protected open = signal(false);

  toggleMenu() {
    this.open.update(o => !o);
  }
}
