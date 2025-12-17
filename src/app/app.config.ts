import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { importProvidersFrom } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

// Função para obter o token JWT
export function getJwtToken(): string | null {
  if (typeof window === 'undefined' || !('sessionStorage' in window)) {
    return null;
  }
  try {
    return sessionStorage.getItem('token');
  } catch {
    return null;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: getJwtToken,
          allowedDomains: ['localhost:4200']
        }
      })
    ),
    MessageService
  ]
};
