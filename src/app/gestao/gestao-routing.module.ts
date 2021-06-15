import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../publico/login/login.component';
import { LoginGuard } from '../guards/login.guard';
import { CrudServicoComponent } from './crud-servico/crud-servico.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';

const routes: Routes = [
  { path: 'publico/login', component: LoginComponent },
  { path: 'gestao/calendario_alternativo', component: AgendamentoComponent, canActivate: [LoginGuard] },
  { path: 'gestao/servicos', component: CrudServicoComponent, canActivate: [LoginGuard] },
  { path: '', component: AgendamentoComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
