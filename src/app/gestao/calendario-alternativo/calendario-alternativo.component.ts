import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
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
import { AgendadorEventEmmiterService } from 'src/app/services/agendadoreventemmiter.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Overlay } from '@angular/cdk/overlay';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-calendario-alternativo',
  templateUrl: './calendario-alternativo.component.html',
  styleUrls: ['./calendario-alternativo.component.css']
})
export class CalendarioAlternativoComponent implements OnInit, AfterViewInit {
  events: any[];
  options: any;
  items: MenuItem[];
  clicouEvento: boolean = false;
  displayDialogNovoEvento = false
  tituloNovoEvento = "Novo Agendamento"
  @ViewChild('fc', { static: true }) fc: FullCalendar;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger
  contextMenuPosition = { x: '0px', y: '0px' }
  eventIdContext: string

  
  constructor(private appService: AppService, 
    private agendadorEmiter: AgendadorEventEmmiterService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private elem: ElementRef,
    private confirmationService: ConfirmationService) { }

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
            "classNames": ["eventid-" + element.id],
            "title": element.cliente.nome + "\n" + "ID evento : " + element.id,
            "start": element.dataInicio,
            "end": element.dataFim,
            "resourceId": (element.profissional ? element.profissional : {}).id ? element.profissional.id : "a",
            "color": this.getColor(element)
          })
        })
        this.atribuirMenuContextoAosEventos();
      }
    })
  }

  private atribuirMenuContextoAosEventos() {
    let elements = this.elem.nativeElement.querySelectorAll('.fc-time-grid-event')
    let _this = this;
    elements.forEach(element => {
      element.oncontextmenu = function (e) {
        e.preventDefault()
        _this.onContextMenu(e, element)
        return false
      };
    });
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

    this.items = [
      {label: 'View', icon: 'pi pi-fw pi-search', command: () => alert('View')},
      {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => alert('Delete')}
    ];
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
      slotDuration : '00:15:00',
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
        left: 'myCustomLeft,myCustomHoje,myCustomRight',
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
      this.abrirEditarAgendamento(eventObj.id);
    }
  }

  private abrirEditarAgendamento(id: any) {
    this.tituloNovoEvento = "Editar Agendamento";
    this.displayDialogNovoEvento = true;
    var evento = new Evento();
    evento._id = id;
    EventEmitterService.get('dialogoNovoEvento').emit(evento);
  }

  editarAgendamento() {
    this.abrirEditarAgendamento(this.eventIdContext) 
  }

  atualizarNaoCompareceu() {
    this.atualizarStatus('NAO_COMPARECEU');
  }

  atualizarEmAtendimento() {
    this.atualizarStatus('EM_ATENDIMENTO');
  }

  private atualizarStatus(status) {
    let statusAgendamento = {
      idEvento: this.eventIdContext,
      status: status
    };
    this.appService.requestPost('/evento/alterar_status', statusAgendamento).subscribe(data => {
      this.appService.msgSucesso('Status alterado com sucesso!');
      this.carregarEventosDoDia();
    });
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

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();

    // procura o evento clicado
    // o id do evento foi adicionado ao nome da classe como workaround
    let classes = item.classList
    classes.forEach(className => {
      if (className.includes("eventid")) {
        this.eventIdContext = className.split('-')[1]
      }
    });
  }

  confirmaExcluir() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.appService.requestGet('/evento/excluir/' + this.eventIdContext).subscribe(data => {
          if (data.deletedCount > 0) {
            this.appService.msgSucesso('Registro excluído com sucesso!')
            this.carregarEventosDoDia()
          }
        })
      },
      reject: () => {
      }
    })
  }

  
  
}
