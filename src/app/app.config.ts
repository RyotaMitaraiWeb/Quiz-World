import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token/token.interceptor';
import { redirectOnErrorInterceptor } from './interceptors/redirect-on-error/redirect-on-error.interceptor';
import { notifyOnServerErrorInterceptor } from './interceptors/notify-on-server-error/notify-on-server-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      tokenInterceptor,
      redirectOnErrorInterceptor,
      notifyOnServerErrorInterceptor,
    ])),
    provideZonelessChangeDetection(),
  ],

};
