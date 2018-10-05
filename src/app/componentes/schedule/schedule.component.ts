import { NgModule, Component, ElementRef, OnDestroy, DoCheck, OnChanges, Input, Output, EventEmitter, IterableDiffers, OnInit, AfterViewChecked, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';

import * as interact from 'interactjs';

declare const moment: any;

@Component({
  selector: 'rn-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class Schedule implements DoCheck, OnDestroy, OnInit, OnChanges, AfterViewChecked {

  resources = new Array();
  periodos = new Array();
  today = new Date();
  dndElement: any;
  static alturaDivEvento = 22;
  static alturaEntreLinha = 3;

  constructor() {

    interact('.evento').resizable({
      // resize from all edges and corners
      edges: { left: false, right: false, bottom: true, top: false },
    }).on('resizemove', function (event: any) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

      target.style.height = event.rect.height + 'px';

    }).on('resizeend', function (event: any) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

      let alturaRequerida = event.target.clientHeight;

      if (event.target.clientHeight < Schedule.alturaDivEvento) {
        target.style.height = Schedule.alturaDivEvento + 'px';
      } else {
        let totalLinhas = Math.round(alturaRequerida / Schedule.alturaDivEvento);
        let novaAltura = totalLinhas * Schedule.alturaDivEvento + (totalLinhas * Schedule.alturaEntreLinha);
        novaAltura -= Schedule.alturaEntreLinha;
        target.style.height = novaAltura + 'px';
      }
    });

    moment.locale('pt-br');
    var momento = moment();
    momento.set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
    for (var _i = 0; _i < 30; _i++) {
      this.periodos.push({ hora: momento.format('LT') });
      momento = momento.add(0.5, 'hour');
    }

    this.resources = [
      { id: 'a', title: 'Recurso A', eventColor: 'green' },
      { id: 'b', title: 'Recurso B', eventColor: 'orange' },
      { id: 'c', title: 'Recurso C', eventColor: 'red' },
      { id: 'd', title: 'Recurso D', eventColor: 'blue' }
    ];

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

  dragStart(event) {
    this.dndElement = event.srcElement;
  }

  drop(event) {
    event.srcElement.appendChild(this.dndElement)
  }

  overTd(event) {
    event.srcElement.bgColor = '#F2F2F2';
  }

  outTd(event) {
    event.srcElement.bgColor = '#FFFFFF';
  }

}

@NgModule({
  imports: [CommonModule, ButtonModule, DragDropModule],
  exports: [Schedule],
  declarations: [Schedule]
})
export class ScheduleModule { }