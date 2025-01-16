import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Log into your Quiz World profile',
      }
    ]
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Quiz World',
  },
];
