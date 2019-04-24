import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from './schedule/schedule.component';
import { EventoModule, EventoComponent } from './evento/evento.component';
import { CriareventoComponent } from './evento/criarevento/criarevento.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    EventoModule
  ],
  declarations: [],
  exports: [ScheduleModule, EventoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EventoComponent, CriareventoComponent]
})
export class ComponentesModule { }
