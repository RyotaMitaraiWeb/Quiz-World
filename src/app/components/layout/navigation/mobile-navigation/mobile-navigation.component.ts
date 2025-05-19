import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MobileSearchFieldDialogComponent } from '../mobile-search-field-dialog/mobile-search-field-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';

@Component({
  selector: 'app-mobile-navigation',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    BurgerMenuComponent,
],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.scss',
})
export class MobileNavigationComponent {
  private readonly dialog = inject(MatDialog);

  openMenu() {
    this.dialog.open(MobileSearchFieldDialogComponent);
  }
}
