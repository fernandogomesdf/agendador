import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    { path: 'publico/login', component: LoginComponent, canActivate: [NoAuthGuard] },
    { path: 'gestao', loadChildren: () => import('./gestao/gestao.module').then(m => m.GestaoModule) },
    { path: '', redirectTo: '/gestao/agendamentos', pathMatch: 'full' },
    { path: '**', redirectTo: '/publico/login' }
];
