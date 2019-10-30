import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  events: any[];
  resources: any[];

  constructor() { }

  ngOnInit() {
    this.events = [
      {
        id: '1',
        resourceId: 'a',
        title: 'Meeting',
        start: '2018-10-02'
      }
    ];
    this.resources = [
      { id: 'a', title: 'Room A' },
      { id: 'b', title: 'Room B', eventColor: 'green' },
      { id: 'c', title: 'Room C', eventColor: 'orange' },
      { id: 'd', title: 'Room D', eventColor: 'red' }
    ]
  }

}
