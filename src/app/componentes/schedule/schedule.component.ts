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
    for (var _i = 0; _i < 10; _i++) {
      momento = momento.add(0.5, 'hour');
      this.periodos.push({ hora: momento.calendar() });
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