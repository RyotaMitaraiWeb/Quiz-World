import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../features/auth/login/login.component';
import { isGuestGuard } from './guards/is-guest/is-guest.guard';
import { RegisterComponent } from '../features/auth/register/register.component';
import { QuizPageComponent } from '../features/quiz-details/quiz-page/quiz-page.component';
import { fetchQuizResolver } from './resolvers/fetch-quiz/fetch-quiz.resolver';
import { CreateQuizComponent } from '../features/create-quiz/create-quiz.component';
import { isLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';
import { EditQuizComponent } from '../features/edit-quiz/edit-quiz.component';
import { canEditQuizGuard } from './guards/can-edit-quiz/can-edit-quiz.guard';
import { AllQuizzesComponent } from '../features/quiz-lists/all-quizzes/all-quizzes.component';
import { fetchAllQuizzesResolver } from './resolvers/fetch-all-quizzes/fetch-all-quizzes.resolver';
import { SearchQuizzesComponent } from '../features/quiz-lists/search-quizzes/search-quizzes.component';
import { fetchSearchResults } from './resolvers/fetch-search-results/fetch-search-results.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isGuestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isGuestGuard]
  },
  {
    path: 'quiz',
    children: [
      {
        path: 'all',
        component: AllQuizzesComponent,
        resolve: [fetchAllQuizzesResolver]
      },
      {
        path: 'search',
        component: SearchQuizzesComponent,
        resolve: [fetchSearchResults]
      },
      {
        path: 'create',
        component: CreateQuizComponent,
        canActivate: [isLoggedInGuard],
      },
      {
        path: ':id',
        component: QuizPageComponent,
        resolve: [fetchQuizResolver],
      },
      {
        path: ':id/edit',
        component: EditQuizComponent,
        canActivate: [canEditQuizGuard],
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
