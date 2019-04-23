import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestaoRoutingModule } from './gestao-routing.module';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { CalendarioAlternativoComponent } from './calendario-alternativo/calendario-alternativo.component';
import { FullCalendarModule } from 'primeng/fullcalendar';


@NgModule({
  imports: [
    CommonModule,
    GestaoRoutingModule,
    ComponentesModule,
    FullCalendarModule
  ],
  declarations: [AgendamentoComponent, CalendarioAlternativoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GestaoModule { }
