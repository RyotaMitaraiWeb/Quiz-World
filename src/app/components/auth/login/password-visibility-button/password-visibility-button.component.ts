import { Component, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-password-visibility-button',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './password-visibility-button.component.html',
  styleUrl: './password-visibility-button.component.scss'
})
export class PasswordVisibilityButtonComponent {
  passwordIsVisible = model(false);

  protected togglePasswordVisibility() {
    this.passwordIsVisible.update(isVisible => !isVisible);
  }
}
