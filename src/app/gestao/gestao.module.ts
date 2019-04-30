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
import { LoginGuard } from '../guards/login.guard';
import { JwtModule } from '@auth0/angular-jwt';

export function getJwtToken(): string {
  return sessionStorage.getItem('token');
}

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
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getJwtToken,
        whitelistedDomains: ['localhost:4200']
      }
    }),

  ],
  providers: [LoginGuard],
  declarations: [AgendamentoComponent, CalendarioAlternativoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestaoModule { }
