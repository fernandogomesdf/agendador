import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './agendamento/agendamento.component';

const routes: Routes = [
  { path: 'gestao/agendamento', component: AgendamentoComponent },
  { path: '', component: AgendamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
