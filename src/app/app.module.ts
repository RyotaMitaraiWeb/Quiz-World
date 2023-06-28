import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { TokenInterceptor } from './util/interceptors/token-interceptor/token.interceptor';
import { UnauthorizedRedirectInterceptor } from './util/interceptors/unauthorized-redirect/unauthorized-redirect.interceptor';

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
    ]
})
export class AppModule { }
