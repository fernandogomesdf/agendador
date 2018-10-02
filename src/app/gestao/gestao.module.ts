import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestaoRoutingModule } from './gestao-routing.module';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  imports: [
    CommonModule,
    GestaoRoutingModule,
    ComponentesModule
  ],
  declarations: [AgendamentoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GestaoModule { }
