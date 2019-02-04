import { NgModule, Component, ElementRef, OnDestroy, DoCheck, OnChanges, Input, Output, EventEmitter, IterableDiffers, OnInit, AfterViewChecked, SimpleChanges, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';

import * as interact from 'interactjs';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

declare const moment: any;

@Component({
  selector: 'rn-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class Schedule implements DoCheck, OnDestroy, OnInit, OnChanges, AfterViewChecked, AfterViewInit {

  data: Date = new Date();
  resources = new Array();
  periodos = new Array();
  events = new Array();
  dndElement: any;
  static alturaDivEvento = 22;
  static alturaEntreLinha = 3;

  constructor(private renderer: Renderer2) {

    interact('.evento').resizable({
      // resize from all edges and corners
      edges: { left: false, right: false, bottom: true, top: false },
    }).on('resizemove', function (event: any) {
      var target = event.target;
      target.style.height = event.rect.height + 'px';

    }).on('resizeend', function (event: any) {
      var target = event.target;
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
    var momento = moment(this.data);
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

    this.events = [
      { id: '2', resourceId: 'a', start: '2018-04-07T09:29:00', end: '2018-04-07T14:00:00', title: 'event 2' },
      { id: '3', resourceId: 'b', start: '2018-04-07T12:00:00', end: '2018-04-08T06:00:00', title: 'event 3' },
      { id: '4', resourceId: 'c', start: '2018-04-07T07:30:00', end: '2018-04-07T09:30:00', title: 'event 4' },
    ];

  }

  ngOnInit() {

  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {
    this.plotarEventos();
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

  plotarEventos() {
    this.events.forEach(evento => {
      var resourceId = evento.resourceId;
      var momentoInicio = moment(evento.start);
      var hora = momentoInicio.format('HH');
      var minutos = +momentoInicio.format('mm') >= 30 ? '30' : '00';
      console.log(document.querySelector("td[data-resourceid='" + resourceId + "'][data-periodo='" + hora + ":" + minutos + "']"));
    });
  }

}

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, ButtonModule, DragDropModule, CalendarModule],
  exports: [Schedule],
  declarations: [Schedule]
})
export class ScheduleModule { }