import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestaoRoutingModule } from './gestao-routing.module';
import { AgendamentoComponent } from './agendamento/agendamento.component';

import { ScheduleModule } from 'primeng/schedule';

@NgModule({
  imports: [
    CommonModule,
    GestaoRoutingModule,
    ScheduleModule
  ],
  declarations: [AgendamentoComponent]
})
export class GestaoModule { }
