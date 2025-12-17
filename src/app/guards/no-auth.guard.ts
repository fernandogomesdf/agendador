import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined') {
      // SSR: não bloqueia renderização; decisão final no client
      return true;
    }
    let token: string | null = null;
    try { token = sessionStorage.getItem('token'); } catch { token = null; }
    if (token) {
      setTimeout(() => this.router.navigate(['/gestao/agendamentos']), 0);
      return false;
    }
    return true;
  }
}
