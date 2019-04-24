import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

@Component({
  selector: 'app-calendario-alternativo',
  templateUrl: './calendario-alternativo.component.html',
  styleUrls: ['./calendario-alternativo.component.css']
})
export class CalendarioAlternativoComponent implements OnInit {

  events: any[];
  options: any;
  displayDialogNovoEvento = true;

  constructor() { }

  ngOnInit() {
    this.events = [
      {
        "title": "Repeating Event",
        "start": "2017-02-01T16:00:00",
        "end": "2017-02-01T16:30:00",
        "resourceId": "a"
      }
    ];

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin, resourceTimeGridPlugin],
      defaultView: 'resourceTimeGridDay',
      defaultDate: '2017-02-01',
      editable: true,
      selectable: true,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      resources: [
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B' },
        { id: 'c', title: 'Auditorium C' }
      ],
      eventClick: this.cliqueEvento,
      dateClick: this.cliqueData,
      eventResize: this.mudancaEvento,
      eventDrop: this.mudancaEvento
    }

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
  }

  cliqueData(evento) {
    console.log(evento)
    alert(evento);
  }

  mudancaEvento(evento) {
    console.log(evento)
    alert("mudancaEvento");
  }
}
