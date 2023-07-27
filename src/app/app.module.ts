import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { TokenInterceptor } from './routing/interceptors/token-interceptor/token.interceptor';
import { UnauthorizedRedirectInterceptor } from './routing/interceptors/unauthorized-redirect/unauthorized-redirect.interceptor';
import { CreateQuizModule } from './features/create-quiz/create-quiz.module';
import { EditQuizModule } from './features/edit-quiz/edit-quiz.module';
import { AdministrationPageModule } from './features/administration-page/administration-page.module';
import { ModeratorsModule } from './features/administration-page/users-list/moderators/moderators.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: UnauthorizedRedirectInterceptor,
        multi: true,
      },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppStoreModule,
        CoreModule,
        HttpClientModule,
        CreateQuizModule,
        EditQuizModule,
        AdministrationPageModule,
        ModeratorsModule,
    ]
})
export class AppModule { }
