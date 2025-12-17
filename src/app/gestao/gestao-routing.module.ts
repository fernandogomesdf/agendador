import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from '../guards/login.guard';
import { CrudServicoComponent } from './crud-servico/crud-servico.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { GestaoLayoutComponent } from './layout/gestao-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GestaoLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'agendamentos', component: AgendamentoComponent },
      { path: 'servicos', component: CrudServicoComponent },

      // Placeholder routes for menu items
      { path: 'caixas', component: AgendamentoComponent }, // Placeholder, redirecting to Agendamento for now or 404 implicitly if I don't set component. User said "create links", implied I should probably have them work or at least be valid routes. I will point them to Agendamento or create a placeholder if desired, but user didn't ask for components for these. I'll point to Agendamento for now to avoid crashes or 404s if they click them.
      { path: 'categorias', component: AgendamentoComponent },
      { path: 'clientes', component: AgendamentoComponent },
      { path: 'comandas', component: AgendamentoComponent },
      { path: 'estabelecimentos', component: AgendamentoComponent },
      { path: 'eventos', component: AgendamentoComponent },
      { path: 'perfis', component: AgendamentoComponent },
      { path: 'profissionais', component: AgendamentoComponent },
      { path: 'usuarios', component: AgendamentoComponent },

      { path: '', redirectTo: 'agendamentos', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
