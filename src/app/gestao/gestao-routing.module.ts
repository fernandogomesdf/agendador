import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { CalendarioAlternativoComponent } from './calendario-alternativo/calendario-alternativo.component';

const routes: Routes = [
  { path: 'gestao/agendamento', component: AgendamentoComponent },
  { path: 'gestao/calendario_alternativo', component: CalendarioAlternativoComponent },
  { path: '', component: AgendamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
