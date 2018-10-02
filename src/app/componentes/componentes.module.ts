import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from './schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule
  ],
  declarations: [],
  exports: [ScheduleModule]
})
export class ComponentesModule { }
