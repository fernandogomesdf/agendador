import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef, ElementRef } from '@angular/core';
import { EventEmitterService } from 'src/app/service/eventemitter.service';
import { AppService } from 'src/app/app.service';
import { Evento } from 'src/app/componentes/dialogoevento/evento';
import ptLocale from '@fullcalendar/core/locales/pt';
import { DateUtilService } from 'src/app/service/dateutil.service';
import * as moment from 'moment';
import { AgendadorEventEmmiterService } from 'src/app/services/agendadoreventemmiter.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Overlay } from '@angular/cdk/overlay';
import { MatMenuTrigger } from '@angular/material/menu';
import { Faturamento } from 'src/app/componentes/dialogoevento/faturamento';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit, AfterViewInit {
  events: any[];
  options: any;
  items: MenuItem[];
  clicouEvento: boolean = false;
  displayDialogNovoEvento = false
  tituloNovoEvento = "Novo Agendamento"

  @ViewChild('fc', { static: true }) fc: FullCalendarComponent;
  @ViewChild('picker', { static: true }) picker: any;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger

  contextMenuPosition = { x: '0px', y: '0px' }
  eventIdContext: string
  hiddenDatePicker: any

  calendarOptions: CalendarOptions = {
    timeZone: 'America/Sao_Paulo',
    initialView: 'resourceTimeGridDay',
    editable: true,
    allDaySlot: false,
    nowIndicator: true,
    locale: ptLocale,
    slotMinTime: '06:00:00',
    contentHeight: 'auto',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'short'
    },
    selectable: true,
    slotDuration: '00:15:00',
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
          this.fc.getApi().prev()
          this.carregarEventosDoDia()
        }
      },
      myCustomRight: {
        icon: 'fc-icon-chevron-right',
        click: () => {
          this.fc.getApi().next()
          this.carregarEventosDoDia()
        }
      },
      myCustomHoje: {
        text: 'hoje',
        click: () => {
          this.fc.getApi().today()
          this.carregarEventosDoDia()
        }
      },
      myCustomCalendar: {
        icon: 'myCustomCalendar',
        click: () => {
          this.picker.open()
        }
      }
    },
    headerToolbar: {
      left: 'myCustomLeft,myCustomHoje,myCustomRight,myCustomCalendar',
      center: 'title',
      right: ''
    },
    eventResize: (event) => { this.atualizarEvento(event) },
    eventDrop: (event) => { this.atualizarEvento(event) }
  };

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

  onDate(evt) {
    this.fc.getApi().gotoDate(new Date(this.hiddenDatePicker));
    this.corrigeBotaoCalendario()
    this.carregarEventosDoDia()
  }

  private corrigeBotaoCalendario() {
    var myCustomCalendar = document.getElementsByClassName("fc-myCustomCalendar-button")[0];
    myCustomCalendar.innerHTML = '';
    var i = document.createElement("i");
    i.setAttribute('class', 'pi pi-calendar');
    myCustomCalendar.appendChild(i);
  }

  carregarRecursos() {

    console.log()
    this.appService.requestPost('/profissional/buscar', { first: 0, rows: 200 }).subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.fc.getApi().addResource({ id: element.id, title: element.nome })
        });
      }
    })

    // altera o botao myCustomCalendar
    this.corrigeBotaoCalendario();
  }

  carregarEventosDoDia() {
    console.log(this.fc.getApi().getDate())
    this.appService.requestPost('/evento/buscar', { dataInicio: this.fc.getApi().getDate(), first: 0, rows: 200 }).subscribe(data => {
      if (data) {
        this.fc.getApi().removeAllEvents()
        data.forEach(element => {
          this.fc.getApi().addEvent({
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

    // altera o botao myCustomCalendar
    this.corrigeBotaoCalendario();
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
        color = '#7300a8' // roxo
      } else if (element.status == 'NAO_COMPARECEU') {
        color = '#686868' // cinza
      } else if (element.status == 'FATURADO') {
        color = '#38908F' // verde
      }
    }
    return color
  }

  ngOnInit() {
    EventEmitterService.get('dialogoNovoEvento').subscribe(data => {
      if (data === 'salvou') {
        this.displayDialogNovoEvento = false;
        this.tituloNovoEvento = "Novo Agendamento"
        this.carregarEventosDoDia()
      }
    });

    this.items = [
      { label: 'View', icon: 'pi pi-fw pi-search', command: () => alert('View') },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => alert('Delete') }
    ];
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

  fecharFaturarContexto() {
    let faturamento = new Faturamento()
    faturamento.idEvento = this.eventIdContext
    this.displayDialogNovoEvento = true
    this.clicouEvento = true
    this.tituloNovoEvento = "Editar Agendamento";
    EventEmitterService.get('dialogoNovoEvento').emit(faturamento);
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
