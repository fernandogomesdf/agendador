import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from '../guards/login.guard';
import { CrudServicoComponent } from './crud-servico/crud-servico.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';

const routes: Routes = [
  { path: 'agendamentos', component: AgendamentoComponent, canActivate: [LoginGuard] },
  { path: 'servicos', component: CrudServicoComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: 'agendamentos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
