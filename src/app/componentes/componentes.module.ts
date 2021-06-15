import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { EventoModule, EventoComponent } from './evento/evento.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import localeBr from '@angular/common/locales/pt';

import { CriarclienteComponent } from './cliente/criarcliente/criarcliente.component';
import { CurrencyMaskModule } from './ng2-currency-mask/currency-mask.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogoeventoComponent } from './dialogoevento/dialogoevento.component';

registerLocaleData(localeBr)

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EventoModule,
    CurrencyMaskModule,
    AutoCompleteModule,
    InputTextModule,
    EditorModule,
    MultiSelectModule,
    InputMaskModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    DialogModule,
    AccordionModule,
    TabViewModule,
    InputNumberModule
  ],
  declarations: [ScheduleComponent, DialogoeventoComponent, CriarclienteComponent],
  exports: [ScheduleComponent, DialogoeventoComponent, CriarclienteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EventoComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class ComponentesModule { }
