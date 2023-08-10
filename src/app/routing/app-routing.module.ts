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
import { AllQuizzesComponent } from '../features/quiz-lists/all-quizzes/all-quizzes.component';
import { fetchAllQuizzesResolver } from './resolvers/fetch-all-quizzes/fetch-all-quizzes.resolver';
import { SearchQuizzesComponent } from '../features/quiz-lists/search-quizzes/search-quizzes.component';
import { fetchSearchResults } from './resolvers/fetch-search-results/fetch-search-results.resolver';
import { fetchQuizForEditResolver } from './resolvers/fetch-quiz-for-edit/fetch-quiz-for-edit.resolver';
import { AdministrationPageComponent } from '../features/administration-page/administration-page.component';
import { UsersComponent } from '../features/administration-page/users-list/users/users.component';
import { ModeratorsComponent } from '../features/administration-page/users-list/moderators/moderators.component';
import { AdminsComponent } from '../features/administration-page/users-list/admins/admins.component';
import { UsernamesComponent } from '../features/administration-page/users-list/usernames/usernames.component';
import { LogsComponent } from '../features/administration-page/logs/logs.component';
import { ProfileComponent } from '../features/profile/profile.component';
import { fetchProfileResolver } from './resolvers/fetch-profile/fetch-profile.resolver';
import { UserQuizzesComponent } from '../features/quiz-lists/user-quizzes/user-quizzes.component';
import { fetchUserQuizzesResolver } from './resolvers/fetch-user-quizzes/fetch-user-quizzes.resolver';
import { HomeComponent } from '../features/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
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
    path: 'profile',
    children: [
      {
        path: ':id',
        component: ProfileComponent,
        resolve: {
          profile: fetchProfileResolver
        }
      }
    ]
  },
  {
    path: 'quiz',
    children: [
      {
        path: 'all',
        component: AllQuizzesComponent,
        resolve: {
          catalogue: fetchAllQuizzesResolver
        }
      },
      {
        path: 'search',
        component: SearchQuizzesComponent,
        resolve: {
          catalogue: fetchSearchResults
        }
      },
      {
        path: 'create',
        component: CreateQuizComponent,
        canActivate: [isLoggedInGuard],
      },
      {
        path: 'user',
        children: [
          {
            path: ':id',
            component: UserQuizzesComponent,
            resolve: {
              catalogue: fetchUserQuizzesResolver
            }
          },
        ]
      },
      {
        path: ':id',
        component: QuizPageComponent,
        resolve: {
          quiz: fetchQuizResolver
        },
      },
      {
        path: ':id/edit',
        component: EditQuizComponent,
        resolve: {
          quiz: fetchQuizForEditResolver
        }
      },
      
    ]
  },
  {
    path: 'administration',
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          activeRoute: 'users',
        }
      },
      {
        path: 'moderators',
        component: ModeratorsComponent,
        data: {
          activeRoute: 'moderators',
        }
      },
      {
        path: 'admins',
        component: AdminsComponent,
        data: {
          activeRoute: 'admins',
        },
      },
      {
        path: 'usernames',
        component: UsernamesComponent,
        data: {
          activeRoute: 'usernames',
        }
      },
      {
        path: 'logs',
        component: LogsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
