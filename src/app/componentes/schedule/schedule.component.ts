import { NgModule, Component, OnDestroy, DoCheck, OnChanges, OnInit, AfterViewChecked, SimpleChanges, AfterViewInit, Renderer2, CUSTOM_ELEMENTS_SCHEMA, ComponentRef, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';

import * as interact from 'interactjs';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventoModule, Evento } from '../evento/evento.component';
import { EventEmitterService } from 'src/app/service/eventemitter.service';

declare const moment: any;

@Component({
  selector: 'rn-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class Schedule implements DoCheck, OnDestroy, OnInit, OnChanges, AfterViewChecked, AfterViewInit {

  eventoComponentRef: ComponentRef<Evento>;
  data: Date = new Date();
  resources = new Array();
  periodos = new Array();
  events = new Array();
  dndElement: any;

  constructor(private renderer: Renderer2, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef, private cd: ChangeDetectorRef) {

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

    EventEmitterService.get('dndElement').subscribe(data => {
      this.dndElement = data;
    });
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

  outTd(event) {
    event.srcElement.bgColor = '#FFFFFF';
  }

  overTd(event) {
    event.srcElement.bgColor = '#F2F2F2';
  }

  drop(event) {
    event.srcElement.appendChild(this.dndElement)
  }

  plotarEventos() {
    this.events.forEach(evento => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(Evento);
      const componentRef = componentFactory.create(this.injector);
      componentRef.instance.id = evento.id;
      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      componentRef.changeDetectorRef.detectChanges();

      var resourceId = evento.resourceId;
      var momentoInicio = moment(evento.start);
      var hora = momentoInicio.format('HH');
      var minutos = +momentoInicio.format('mm') >= 30 ? '30' : '00';
      var celulasEvento = document.querySelectorAll("td[data-resourceid='" + resourceId + "'][data-periodo='" + hora + ":" + minutos + "']");
      if (celulasEvento) {
        celulasEvento.forEach(celula => {
          this.renderer.appendChild(celula, domElem);
        });
      }
    });
  }

}

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, ButtonModule, DragDropModule, CalendarModule, EventoModule],
  exports: [Schedule],
  declarations: [Schedule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScheduleModule { }