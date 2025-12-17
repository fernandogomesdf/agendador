import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef, ElementRef, PLATFORM_ID, inject as ngInject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EventEmitterService } from '../../services/eventemitter.service';
import { AppService } from '../../app.service';
import { Evento } from '../../componentes/dialogoevento/evento';
import ptLocale from '@fullcalendar/core/locales/pt';
import { DateUtilService } from '../../services/dateutil.service';
import moment from 'moment';
// FullCalendar plugins agora registrados localmente (remoção de registerPlugins global devido a SSR)
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { AgendadorEventEmmiterService } from '../../services/agendadoreventemmiter.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Faturamento } from '../../componentes/dialogoevento/faturamento';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DatePickerModule, DatePicker } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ComponentesModule } from '../../componentes/componentes.module';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    DatePickerModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    ComponentesModule
  ]
})
export class AgendamentoComponent implements OnInit, AfterViewInit {
  events: any[] = [];
  options: any;
  items: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  public isBrowserEnv = false;
  clicouEvento: boolean = false;
  displayDialogNovoEvento = false
  tituloNovoEvento = "Novo Agendamento"

  // Como o calendário é renderizado condicionalmente (*ngIf) apenas no browser,
  // precisamos de static:false para que o ViewChild seja resolvido depois que o elemento aparecer.
  @ViewChild('fc', { static: false }) fc?: FullCalendarComponent;
  @ViewChild('dp', { static: false }) dp?: DatePicker;
  @ViewChild('cm', { static: false }) contextMenu?: ContextMenu;

  datePickerTop = '0px';
  datePickerLeft = '0px';

  contextMenuPosition = { x: '0px', y: '0px' }
  eventIdContext: string = ''
  hiddenDatePicker: Date = new Date();
  showCalendarOverlay = false;

  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimelinePlugin, resourceTimeGridPlugin],
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
    eventClick: (e: any) => { this.cliqueEvento(e) },
    dateClick: (e: any) => { this.cliqueData(e) },
    eventDidMount: (info: any) => { this.anexarContextoEvento(info); },
    customButtons: {
      myCustomLeft: {
        icon: 'fc-icon-chevron-left',
        click: () => {
          const api = this.getCalendarApi();
          if (!api) { return; }
          api.prev();
          this.carregarEventosDoDia();
        }
      },
      myCustomRight: {
        icon: 'fc-icon-chevron-right',
        click: () => {
          const api = this.getCalendarApi();
          if (!api) { return; }
          api.next();
          this.carregarEventosDoDia();
        }
      },
      myCustomHoje: {
        text: 'hoje',
        click: () => {
          const api = this.getCalendarApi();
          if (!api) { return; }
          api.today();
          this.carregarEventosDoDia();
        }
      },
      myCustomCalendar: {
        icon: 'myCustomCalendar',
        click: (mouseEvent: MouseEvent, htmlElement: HTMLElement) => {
          const rect = htmlElement.getBoundingClientRect();
          this.datePickerTop = (rect.bottom + window.scrollY) + 'px';
          this.datePickerLeft = (rect.left + window.scrollX) + 'px';
          this.showCalendarOverlay = !this.showCalendarOverlay;
        }
      }
    },
    headerToolbar: {
      left: 'myCustomLeft,myCustomHoje,myCustomRight,myCustomCalendar',
      center: 'title',
      right: ''
    },
    eventResize: (event: any) => { this.atualizarEvento(event) },
    eventDrop: (event: any) => { this.atualizarEvento(event) }
  };

  constructor(private appService: AppService,
    private agendadorEmiter: AgendadorEventEmmiterService,
    public viewContainerRef: ViewContainerRef,
    private elem: ElementRef,
    private confirmationService: ConfirmationService) {
    // Define o flag antes da primeira verificação de mudança para evitar ExpressionChangedAfterItHasBeenCheckedError
    this.isBrowserEnv = isPlatformBrowser(this.platformId);
  }

  private platformId = ngInject(PLATFORM_ID);
  private isBrowser(): boolean { return isPlatformBrowser(this.platformId); }

  ngAfterViewInit(): void {
    if (!this.isBrowser()) { return; }
    // Deferimos para garantir que o *ngIf já inseriu o componente do calendário no DOM.
    setTimeout(() => {
      this.initCalendarData();
    });
  }

  private initCalendarData() {
    const api = this.getCalendarApi();
    if (!api) { return; }
    this.carregarRecursos();
    this.carregarEventosDoDia();
  }

  private getCalendarApi() {
    return this.fc?.getApi();
  }

  onDate(evt: any) {
    const api = this.getCalendarApi();
    if (!api) { return; }
    // PrimeNG Calendar emits the Date object directly or via event.value
    const selectedDate = evt.value || evt;
    if (selectedDate) {
      api.gotoDate(selectedDate);
      this.corrigeBotaoCalendario();
      this.carregarEventosDoDia();
      this.showCalendarOverlay = false;
    }
  }

  private corrigeBotaoCalendario() {
    if (!this.isBrowser()) { return; }
    const btn = document.getElementsByClassName("fc-myCustomCalendar-button")[0] as HTMLElement | undefined;
    if (!btn) return;
    btn.innerHTML = '';
    const i = document.createElement('i');
    i.className = 'pi pi-calendar';
    btn.appendChild(i);
  }

  carregarRecursos() {
    if (!this.isBrowser()) { return; }
    const api = this.getCalendarApi();
    if (!api) { return; }
    const token = this.getToken();
    if (!token) { return; }
    this.appService.requestPost('/profissional/buscar', { first: 0, rows: 200 }).subscribe((data: any[]) => {
      if (data) {
        data.forEach((element: any) => {
          (api as any).addResource({ id: element.id, title: element.nome })
        });
      }
    });

    // altera o botao myCustomCalendar
    this.corrigeBotaoCalendario();
  }

  carregarEventosDoDia() {
    if (!this.isBrowser()) { 
      console.log('[DEBUG] carregarEventosDoDia: não é browser');
      return; 
    }
    const api = this.getCalendarApi();
    if (!api) { 
      console.log('[DEBUG] carregarEventosDoDia: api não disponível');
      return; 
    }
    const token = this.getToken();
    if (!token) { 
      console.log('[DEBUG] carregarEventosDoDia: token não disponível');
      return; 
    }
    
    const dataInicio = api.getDate();
    // Converter para ISO string para o backend
    const dataInicioISO = dataInicio.toISOString();
    console.log('[DEBUG] carregarEventosDoDia: buscando eventos para data:', dataInicioISO);
    
    this.appService.requestPost('/evento/buscar', { dataInicio: dataInicioISO, first: 0, rows: 200 }).subscribe({
      next: (data: any[]) => {
        console.log('[DEBUG] carregarEventosDoDia: resposta recebida:', data);
        if (data) {
          api.removeAllEvents();
          data.forEach((element: any) => {
            api.addEvent({
              id: element.id,
              classNames: ["eventid-" + element.id],
              title: element.cliente.nome + "\n" + "ID evento : " + element.id,
              start: element.dataInicio,
              end: element.dataFim,
              resourceId: (element.profissional ? element.profissional : {}).id ? element.profissional.id : "a",
              color: this.getColor(element)
            });
          });
          console.log('[DEBUG] carregarEventosDoDia: eventos adicionados:', data.length);
        }
      },
      error: (err) => {
        console.error('[DEBUG] carregarEventosDoDia: erro ao buscar eventos:', err);
      }
    });

    // altera o botao myCustomCalendar
    this.corrigeBotaoCalendario();
  }

  private anexarContextoEvento(info: any) {
    const el = info.el;
    if (!el || (el as any)._contextBound) { return; }
    (el as any)._contextBound = true;

    el.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
      this.eventIdContext = info.event.id;
      if (this.contextMenu) {
        this.contextMenu.show(e);
      }
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
    if (!this.isBrowser()) { return; }
    EventEmitterService.get('dialogoNovoEvento').subscribe(data => {
      if (data === 'salvou') {
        this.displayDialogNovoEvento = false;
        this.tituloNovoEvento = "Novo Agendamento"
        this.carregarEventosDoDia()
      }
    });

    this.menuItems = [
      {
        label: 'Editar agendamento',
        icon: 'pi pi-pencil',
        command: () => {
          this.contextMenu?.hide();
          setTimeout(() => this.editarAgendamento(), 100);
        }
      },
      {
        label: 'Fechar e faturar',
        icon: 'pi pi-wallet',
        command: () => {
          this.contextMenu?.hide();
          setTimeout(() => this.fecharFaturarContexto(), 100);
        }
      },
      {
        label: 'Não compareceu',
        icon: 'pi pi-times',
        command: () => {
          this.contextMenu?.hide();
          setTimeout(() => this.atualizarNaoCompareceu(), 100);
        }
      },
      {
        label: 'Em atendimento',
        icon: 'pi pi-briefcase',
        command: () => {
          this.contextMenu?.hide();
          setTimeout(() => this.atualizarEmAtendimento(), 100);
        }
      },
      {
        label: 'Excluir agendamento',
        icon: 'pi pi-trash',
        command: () => {
          this.contextMenu?.hide();
          setTimeout(() => this.confirmaExcluir(), 100);
        }
      }
    ];
  }

  atualizarEvento(event: any) {
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

  cliqueData(e: any) {
    if (!this.isBrowser()) { return; }
    this.clicouEvento = false
    this.tituloNovoEvento = "Novo Agendamento"
    this.displayDialogNovoEvento = true;
    EventEmitterService.get('dialogoNovoEvento').emit(e.date)
  }

  cliqueEvento(info: any) {
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

  private atualizarStatus(status: string) {
    if (!this.isBrowser()) { return; }
    let statusAgendamento = {
      idEvento: this.eventIdContext,
      status: status
    };
    this.appService.requestPost('/evento/alterar_status', statusAgendamento).subscribe(data => {
      this.appService.msgSucesso('Status alterado com sucesso!');
      this.carregarEventosDoDia();
    });
  }

  mudancaEvento(evento: any) {
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
    if (!this.isBrowser()) { return; }
    let faturamento = new Faturamento()
    faturamento.idEvento = this.eventIdContext
    this.displayDialogNovoEvento = true
    this.clicouEvento = true
    this.tituloNovoEvento = "Editar Agendamento";
    EventEmitterService.get('dialogoNovoEvento').emit(faturamento);
  }

  confirmaExcluir() {
    if (!this.isBrowser()) { return; }
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

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    try { return sessionStorage.getItem('token'); } catch { return null; }
  }

}
