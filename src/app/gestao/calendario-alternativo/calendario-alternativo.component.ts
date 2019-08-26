import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { EventEmitterService } from 'src/app/service/eventemitter.service';
import { AppService } from 'src/app/app.service';
import { FullCalendar } from 'primeng/fullcalendar';
import { Evento } from 'src/app/componentes/evento/criarevento/evento';
import ptLocale from '@fullcalendar/core/locales/pt';
import { DateUtilService } from 'src/app/service/dateutil.service';
import * as moment from 'moment';


@Component({
  selector: 'app-calendario-alternativo',
  templateUrl: './calendario-alternativo.component.html',
  styleUrls: ['./calendario-alternativo.component.css']
})
export class CalendarioAlternativoComponent implements OnInit, AfterViewInit {
  events: any[];
  options: any;
  clicouEvento: boolean = false;
  displayDialogNovoEvento = false
  tituloNovoEvento = "Novo Agendamento"
  @ViewChild('fc', { static: true }) fc: FullCalendar;

  constructor(private appService: AppService) { }

  ngAfterViewInit(): void {
    this.carregarRecursos()
    this.carregarEventosDoDia()
  }

  carregarRecursos() {
    this.appService.requestPost('/profissional/buscar', { data: this.fc.getCalendar().state.currentDate, first: 0, rows: 200 }).subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.fc.getCalendar().addResource({ id: element.id, title: element.nome })
        });
      }
    })
  }

  carregarEventosDoDia() {
    this.appService.requestPost('/evento/buscar', { dataInicio: this.fc.getCalendar().state.currentDate, first: 0, rows: 200 }).subscribe(data => {
      if (data) {
        this.fc.getCalendar().removeAllEvents()
        data.forEach(element => {
          this.fc.getCalendar().addEvent({
            "id": element.id,
            "title": element.cliente.nome + "\n" + "ID evento : " + element.id,
            "start": element.dataInicio,
            "end": element.dataFim,
            "resourceId": (element.profissional ? element.profissional : {}).id ? element.profissional.id : "a",
            "color": this.getColor(element)
          })
        })
      }
    })
  }

  getColor(element: any) {
    let color = ''
    if (element) {
      if (element.status == 'EM_ATENDIMENTO') {
        color = '#e7a52c' // laranja
      } else if (element.status == 'NAO_COMPARECEU') {
        color = '#686868' // cinza
      } else if (element.status == 'FECHADO') {
        color = '#38908F' // verde
      }
    }
    return color
  }

  ngOnInit() {
    this.options = this.getOptions()

    EventEmitterService.get('dialogoNovoEvento').subscribe(data => {
      if (data === 'salvou') {
        this.displayDialogNovoEvento = false;
        this.tituloNovoEvento = "Novo Agendamento"
        this.carregarEventosDoDia()
      }
    });
  }

  getOptions() {
    return {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin, resourceTimeGridPlugin],
      defaultView: 'resourceTimeGridDay',
      editable: true,
      allDaySlot: false,
      nowIndicator: true,
      locale: ptLocale,
      minTime: '06:00:00',
      contentHeight: 'auto',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'
      },
      selectable: true,
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      resources: [
        { id: 'a', title: 'Em espera' }
      ],
      eventClick: (e) => { this.cliqueEvento(e) },
      dateClick: (e) => { this.cliqueData(e) },
      customButtons: {
        myCustomLeft: {
          icon: 'fc-icon-chevron-left',
          click: (arg) => {
            this.fc.getCalendar().prev()
            this.carregarEventosDoDia()
          }
        },
        myCustomRight: {
          icon: 'fc-icon-chevron-right',
          click: () => {
            this.fc.getCalendar().next()
            this.carregarEventosDoDia()
          }
        },
        myCustomHoje: {
          text: 'hoje',
          click: () => {
            this.fc.getCalendar().today()
            this.carregarEventosDoDia()
          }
        }
      },
      header: {
        left: 'myCustomLeft,myCustomRight myCustomHoje',
        center: 'title',
        right: ''
      },
      eventResize: (event) => { this.atualizarEvento(event) },
      eventDrop: (event) => { this.atualizarEvento(event) }
    }
  }

  atualizarEvento(event) {
    let atualizacaoInicioFim = {
      id: event.event.id,
      dataInicio: DateUtilService.localToUtc(event.event.start),
      dataFim: DateUtilService.localToUtc(event.event.end),
      profissional: {
        id: event.event._def.resourceIds[0]
      },
      duracao: moment(event.event.end).diff(event.event.start, 'minutes')
    }
    this.appService.requestPost('/evento/alterar', atualizacaoInicioFim).subscribe(data => { });
  }

  cliqueData(e) {
    this.clicouEvento = false
    this.tituloNovoEvento = "Novo Agendamento"
    this.displayDialogNovoEvento = true;
    EventEmitterService.get('dialogoNovoEvento').emit(e.date)
  }

  cliqueEvento(info) {
    this.clicouEvento = true
    var eventObj = info.event
    if (eventObj.url) {
      alert(
        'Clicked ' + eventObj.title + '.\n' +
        'Will open ' + eventObj.url + ' in a new tab'
      );
    } else {
      this.tituloNovoEvento = "Editar Agendamento"
      this.displayDialogNovoEvento = true;
      var evento = new Evento()
      evento._id = eventObj.id
      EventEmitterService.get('dialogoNovoEvento').emit(evento)
    }
  }

  mudancaEvento(evento) {
    console.log(this.events)
    alert("mudancaEvento");
  }

  cancelarNovoEvento() {
    EventEmitterService.get('dialogoNovoEvento').emit('cancelar');
    this.displayDialogNovoEvento = false;
  }

  salvarNovoEvento() {
    EventEmitterService.get('dialogoNovoEvento').emit('salvar');
  }

  emAtendimento() {
    EventEmitterService.get('dialogoNovoEvento').emit('EM_ATENDIMENTO');
  }

  naoCompareceu() {
    EventEmitterService.get('dialogoNovoEvento').emit('NAO_COMPARECEU');
  }

  fecharFaturar() {
    EventEmitterService.get('dialogoNovoEvento').emit('FECHAR_FATURAR');
  }
}
