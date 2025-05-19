import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private readonly snackbar: MatSnackBar) { }

  open(message: string, action: string, ...classNames: string[]): void;
  open(message: string[], action: string, ...classNames: string[]): void;
  open(message: string[], action: string): void;
  open(message: string, action: string): void;
  open(message: string[]): void;
  open(message: string): void;
  open(message: string | string[], action?: string, ...classNames: string[]): void {
    if (Array.isArray(message)) {
      message = message.join('\n');
    }

    const panelClass = this.generatePanelClass(classNames);
    this.snackbar.open(message, action, {
      panelClass,
    });
  }

  private generatePanelClass(classNames: string[] | undefined | null): string[] {
    if (!classNames) {
      return ['prewrap'];
    }

    return [...classNames, 'prewrap'];
  }
}
