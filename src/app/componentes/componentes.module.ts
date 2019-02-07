import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from './schedule/schedule.component';
import { EventoModule } from './evento/evento.component';


@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    EventoModule
  ],
  declarations: [],
  exports: [ScheduleModule, EventoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentesModule { }
