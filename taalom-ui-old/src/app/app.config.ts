import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './auth/store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient(withFetch())
  ]
};
