import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  events: any[];

  constructor() { }

  ngOnInit() {
    this.events = [
      {
        "title": "All Day Event",
        "start": "2018-10-02"
      },
      {
        "title": "Long Event",
        "start": "2016-01-07",
        "end": "2016-01-10"
      },
      {
        "title": "Repeating Event",
        "start": "2016-01-09T16:00:00"
      },
      {
        "title": "Repeating Event",
        "start": "2016-01-16T16:00:00"
      },
      {
        "title": "Conference",
        "start": "2016-01-11",
        "end": "2016-01-13"
      }
    ];
  }

}
