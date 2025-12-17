import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(public jwtHelper: JwtHelperService, public router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // Em SSR não há sessionStorage; permitir render e validar no client
        if (typeof window === 'undefined') {
            return true;
        }
        let retorno = true;
        if (!this.isAuthenticated()) {
            try {
                const segmentos = next.url.map(u => u.path).filter(p => !!p);
                sessionStorage.setItem('rotarequerida', segmentos.join(','));
            } catch {}
            // Navegação só no browser
            setTimeout(() => this.router.navigate(['publico/login']), 0);
            retorno = false;
        }
        return retorno;
    }

    public isAuthenticated(): boolean {
        let retorno = false;
        try {
            const token = typeof window === 'undefined' ? null : this.jwtHelper.tokenGetter();
            if (token) {
                retorno = !this.jwtHelper.isTokenExpired();
            }
        } catch { retorno = false; }
        return retorno;
    }
}