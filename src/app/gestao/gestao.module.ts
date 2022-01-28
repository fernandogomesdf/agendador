import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { GestaoRoutingModule } from './gestao-routing.module';
import { ComponentesModule } from '../componentes/componentes.module';

import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { LoginGuard } from '../guards/login.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { CrudServicoComponent } from './crud-servico/crud-servico.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { CurrencyMaskModule } from '../componentes/ng2-currency-mask/currency-mask.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { MatNativeDateModule } from '@angular/material/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FullCalendarModule } from '@fullcalendar/angular';

// plugins do calendario
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  resourceTimelinePlugin,
  resourceTimeGridPlugin
]);

// armazenamento do token
export function getJwtToken(): string {
  return sessionStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    TableModule,
    CurrencyMaskModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getJwtToken,
        allowedDomains: ['localhost:4200']
      }
    }),
    ConfirmDialogModule,
    FieldsetModule,
    InputTextareaModule,
    CurrencyMaskModule,
    OverlayModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    InputNumberModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OverlayPanelModule
  ],
  providers: [LoginGuard, ConfirmationService, CurrencyPipe],
  declarations: [AgendamentoComponent, CrudServicoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GestaoModule { }
