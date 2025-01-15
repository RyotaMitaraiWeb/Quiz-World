import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserStore } from '../../../store/user/user.store';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly userStore = inject(UserStore);
}
