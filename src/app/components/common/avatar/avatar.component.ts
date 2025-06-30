import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input, model, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage, MatIconModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  src = model.required<string>();
  alt = input.required<string>();
  size = input.required<avatarSize>();
  priority = input(false);

  private retryCount = 0;
  private maxRetries = 3;

  protected readonly test = computed(() => this.src());

  protected readonly avatarSize = 256;

  protected readonly failedToLoad = signal(false);

  handleError() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      // Make sure the signal treats this as a new value
      this.src.set(`${this.src()}?retry=${Date.now()}`);
    } else {
      this.failedToLoad.set(true);
    }
  }
}

type avatarSize = 'small' | 'medium' | 'large';
