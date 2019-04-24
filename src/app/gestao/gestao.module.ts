import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestaoRoutingModule } from './gestao-routing.module';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { CalendarioAlternativoComponent } from './calendario-alternativo/calendario-alternativo.component';

import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CriareventoComponent } from '../componentes/evento/criarevento/criarevento.component';


@NgModule({
  imports: [
    CommonModule,
    GestaoRoutingModule,
    ComponentesModule,
    FullCalendarModule,
    DialogModule,
    AutoCompleteModule,
    MultiSelectModule,
    DropdownModule,
    InputTextModule,
    EditorModule,
    InputMaskModule,
    RadioButtonModule,
    ButtonModule

  ],
  declarations: [AgendamentoComponent, CalendarioAlternativoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoModule { }
