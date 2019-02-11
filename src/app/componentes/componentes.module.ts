import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from './schedule/schedule.component';
import { EventoModule, Evento } from './evento/evento.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    EventoModule
  ],
  declarations: [],
  exports: [ScheduleModule, EventoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [Evento]
})
export class ComponentesModule { }
