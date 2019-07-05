import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { EventEmitterService } from 'src/app/service/eventemitter.service';
import { AppService } from 'src/app/app.service';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'app-calendario-alternativo',
  templateUrl: './calendario-alternativo.component.html',
  styleUrls: ['./calendario-alternativo.component.css']
})
export class CalendarioAlternativoComponent implements OnInit, AfterViewInit {
  events: any[];
  options: any;
  displayDialogNovoEvento = false;
  @ViewChild('fc', { static: true }) fc: FullCalendar;

  constructor(private appService: AppService) { }

  ngAfterViewInit(): void {
    this.carregarEventosDoDia()
  }

  carregarEventosDoDia() {
    this.appService.requestPost('/evento/buscar', { data: this.fc.getCalendar().state.currentDate }).subscribe(data => {
      this.events = []
      data.forEach(element => {
        this.events.push({
          "title": element.cliente.nome,
          "start": element.dataInicio,
          "end": element.dataFim,
          "resourceId": "a"
        })
      });
    })
  }

  ngOnInit() {
    /*this.events = [
      {
        "title": "Repeating Event",
        "start": new Date(),
        "end": "2017-02-01T16:30:00",
        "resourceId": "a"
      }
    ];*/

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin, resourceTimeGridPlugin],
      defaultView: 'resourceTimeGridDay',
      editable: true,
      selectable: true,
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      resources: [
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B' },
        { id: 'c', title: 'Auditorium C' }
      ],
      eventClick: this.cliqueEvento,
      dateClick: (e) => {
        this.displayDialogNovoEvento = true;
        EventEmitterService.get('dialogoNovoEvento').emit(e.date)
      },
      customButtons: {
        myCustomLeft: {
          icon: 'fc-icon-chevron-left',
          click: () => {
            this.fc.getCalendar().prev()
          }
        },
        myCustomRight: {
          icon: 'fc-icon-chevron-right',
          click: () => {
            this.fc.getCalendar().next()
          }
        },
        myCustomHoje: {
          text: 'hoje',
          click: () => {
            this.fc.getCalendar().today()
          }
        }
      },
      header: {
        left: 'myCustomLeft,myCustomRight myCustomHoje',
        center: 'title',
        right: ''
      },
      eventResize: this.mudancaEvento,
      eventDrop: this.mudancaEvento
    }

    EventEmitterService.get('dialogoNovoEvento').subscribe(data => {
      if (data === 'salvou') {
        this.displayDialogNovoEvento = false;
        this.carregarEventosDoDia()
      }
    });
  }

  cliqueEvento(info) {
    var eventObj = info.event;
    if (eventObj.url) {
      alert(
        'Clicked ' + eventObj.title + '.\n' +
        'Will open ' + eventObj.url + ' in a new tab'
      );
    } else {
      alert('Clicked ' + eventObj.title);
    }
    console.log(eventObj)
  }

  cliqueData(evento) {
    console.log(evento)
    alert("evento")
  }

  mudancaEvento(evento) {
    console.log(evento)
    alert("mudancaEvento");
  }

  cancelarNovoEvento() {
    EventEmitterService.get('dialogoNovoEvento').emit('cancelar');
    this.displayDialogNovoEvento = false;
  }

  salvarNovoEvento() {
    EventEmitterService.get('dialogoNovoEvento').emit('salvar');
  }
}