import { NgModule, Component, ElementRef, OnDestroy, DoCheck, OnChanges, Input, Output, EventEmitter, IterableDiffers, OnInit, AfterViewChecked, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const moment: any;

@Component({
  selector: 'rn-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class Schedule implements DoCheck, OnDestroy, OnInit, OnChanges, AfterViewChecked {

  periodos = new Array();
  today = new Date();

  constructor() {
    moment.locale('pt-br');
    var momento = moment();
    momento.set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
    for (var _i = 0; _i < 30; _i++) {
      this.periodos.push({ hora: momento.calendar() });
      momento = momento.add(0.5, 'hour');
    }
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  initialize() {

  }

  ngDoCheck() {

  }

  ngOnDestroy() {

  }

}

@NgModule({
  imports: [CommonModule],
  exports: [Schedule],
  declarations: [Schedule]
})
export class ScheduleModule { }