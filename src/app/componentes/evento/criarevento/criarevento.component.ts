import { Component, OnInit, AfterViewInit, ApplicationRef, ViewChild, Input } from '@angular/core';
import { CriareventoService } from './criarevento.service';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { EventEmitterService } from 'src/app/service/eventemitter.service';
import { AppService } from 'src/app/app.service';
import { Evento } from './evento';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css']
})
export class CriareventoComponent implements OnInit, AfterViewInit {

  resultsCliente: string[];
  servicos: SelectItemRN[] = [];
  profissionais: SelectItem[] = [];
  mensagensValidacao: string[] = [];
  agendamento: any = {};
  pt: any;
  displayDialogNovoCliente = false;

  @ViewChild('proDD', { static: true }) proDD: Dropdown;

  constructor(private criarEventoService: CriareventoService, private appService: AppService) {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  ngOnInit() {
    EventEmitterService.get('dialogoNovoEvento').subscribe(data => {
      if (data instanceof Date) {
        this.agendamento = {}
        this.agendamento.dataInicio = data
      } if (data instanceof Evento) {
        this.appService.requestGet('/evento/buscar/' + data._id).subscribe(data => {
          this.carregarAgendamento(data)
        })
      } else {
        switch (data) {
          case "salvar": {
            this.salvar();
            break;
          }
          case "cancelar": {
            this.cancelar();
            break;
          }
        }
      }
    });

    EventEmitterService.get('dialogoNovoCliente').subscribe(data => {
      switch (data) {
        case "fechar": {
          this.displayDialogNovoCliente = false;
          break;
        }
        case "salvar": {
          break;
        }
        case "cancelar": {
          break;
        }
        default: {
          this.setFoneNome(data);
          this.agendamento.cliente = data;
          break;
        }
      }
    });
  }

  ngOnDestroy() {
  }

  carregarAgendamento(evento) {
    this.agendamento.id = evento.id;
    this.agendamento.observacoes = evento.observacoes
    this.agendamento.dataInicio = new Date(evento.dataInicio)
    this.agendamento.profissional = evento.profissional.id
    this.agendamento.cliente = evento.cliente
    this.setFoneNome(this.agendamento.cliente)
    this.agendamento.valor = evento.valor
    evento.servicos.forEach(element => {
      this.agendamento.servicos = []
      this.agendamento.servicos.push(element.id)
    });
    this.agendamento.duracao = evento.duracao
  }

  atualizarPrecoAgendamento(event) {
    let servicosSelecionados = this.agendamento.servicos;
    let precoAgendamento: number = 0;
    this.servicos.filter(function (item) {
      return servicosSelecionados.includes(item.value)
    }).forEach(elemento => {
      precoAgendamento += elemento.valor;
    })
    this.agendamento.valor = precoAgendamento;
  }

  salvar() {
    if (this.isValido()) {
      this.agendamento.dataInicio = this.localToUtc(this.agendamento.dataInicio) // importante - fullcalendar usa horario UTC, primeng usa horario local
      this.appService.requestPost(this.agendamento.id ? '/evento/alterar' : '/evento/inserir', this.agendamento).subscribe(data => {
        this.appService.msgSucesso('Agendamento salvo com sucesso!');
        this.agendamento = {};
        EventEmitterService.get('dialogoNovoEvento').emit('salvou');
      });
    }
  }

  isValido(): boolean {
    this.mensagensValidacao = [];

    if (!(this.agendamento.cliente || {}).id) {
      this.mensagensValidacao.push("É necessário informar o cliente.");
    }

    if (!this.agendamento.servicos) {
      this.mensagensValidacao.push("É necessário informar o serviço.");
    }

    if (!this.agendamento.dataInicio) {
      this.mensagensValidacao.push("É necessário informar a data.");
    }

    if (!this.agendamento.duracao) {
      this.mensagensValidacao.push("É necessário informar a duracao.");
    }

    this.mensagensValidacao.forEach(mensagem => {
      this.appService.msgWarn(mensagem)
    });

    return this.mensagensValidacao.length == 0;
  }

  cancelar() {
  }

  cancelarNovoCliente() {
    EventEmitterService.get('dialogoNovoCliente').emit('cancelar');
    this.displayDialogNovoCliente = false;
  }

  salvarNovoCliente() {
    EventEmitterService.get('dialogoNovoCliente').emit('salvar');
  }

  abrirNovoCliente() {
    this.displayDialogNovoCliente = true;
  }

  //TODO remover
  getAgendamento(): string {
    return JSON.stringify(this.agendamento);
  }

  ngAfterViewInit() {
    this.criarEventoService.listarServicos().subscribe(data => {
      data = data.entidade
      data.forEach(element => {
        this.servicos.push({ label: element.nome, value: element.id, valor: element.valor });
      });
    });

    this.criarEventoService.listarProfissionais().subscribe(data => {
      data.forEach(element => {
        this.profissionais.push({ label: element.nome, value: element.id });
      });
    });
  }

  searchCliente(event) {
    this.criarEventoService.searchCliente(event).subscribe(data => {
      data.forEach(cliente => {
        this.setFoneNome(cliente);
      });
      this.resultsCliente = data;
    });
  }

  setFoneNome(cliente) {
    cliente.fone_nome = ''.concat(cliente.telefone.concat(' - ').concat(cliente.nome))
  }

  private localToUtc(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }

  private utcToLocal(date: Date): Date {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }
}

export interface SelectItemRN extends SelectItem {
  valor: any;
}
