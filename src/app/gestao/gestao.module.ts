import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { GestaoRoutingModule } from './gestao-routing.module';

import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { CrudServicoComponent } from './crud-servico/crud-servico.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmationService } from 'primeng/api';

import { DatePickerModule } from 'primeng/datepicker';
import { LoginGuard } from '../guards/login.guard';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogModule } from 'primeng/dialog';

// plugins do calendario
// Plugins importados diretamente nos componentes conforme necessidade (remoção de registerPlugins para SSR)
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

export const FULLCALENDAR_PLUGINS = [
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  resourceTimelinePlugin,
  resourceTimeGridPlugin
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GestaoRoutingModule,
    FullCalendarModule,
    DialogModule,
    ConfirmDialogModule,
    ContextMenuModule,
    ComponentesModule,
    FieldsetModule,
    TableModule,
    ButtonModule,
    Textarea,
    InputTextModule,
    RadioButtonModule,
    CurrencyMaskModule,
    InputNumberModule,
    Select,
    DatePickerModule,
    AgendamentoComponent,
    CrudServicoComponent
  ],
  providers: [LoginGuard, ConfirmationService, CurrencyPipe],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GestaoModule { }
