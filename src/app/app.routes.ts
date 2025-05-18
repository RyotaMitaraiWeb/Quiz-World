import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { QuizDetailsComponent } from './pages/quiz/quiz-details/quiz-details.component';
import { CreateQuizComponent } from './pages/quiz/create/create.component';
import { EditComponent } from './pages/quiz/edit/edit.component';
import { AdminPageComponent } from './pages/admin/admin-page/admin-page.component';
import { SearchPageComponent } from './pages/quiz/search-page/search-page.component';
import { AllPageComponent } from './pages/quiz/all-page/all-page.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Log into your Quiz World profile',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Create your new Quiz World profile',
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Quiz World',
  },
  {
    path: 'quiz',
    children: [
      {
        path: 'all',
        component: AllPageComponent,
        title: 'Browse all quizzes | Quiz World',
      },
      {
        path: 'create',
        component: CreateQuizComponent,
        title: 'Create a new quiz | Quiz World',
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: ':id',
        children: [
          {
            component: QuizDetailsComponent,
            path: '',
          },
          {
            path: 'edit',
            component: EditComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'user',
        children: [
          {
            path: ':username',
            component: ProfileComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    title: 'Administrator area',
    component: AdminPageComponent,
  },
];
