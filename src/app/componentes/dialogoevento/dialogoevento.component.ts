import { Component, OnInit, AfterViewInit, ApplicationRef, ViewChild, Input } from '@angular/core';
import { DialogoeventoService } from './dialogoevento.service';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { EventEmitterService } from 'src/app/service/eventemitter.service';
import { AppService } from 'src/app/app.service';
import { Evento } from './evento';
import { DateUtilService } from 'src/app/service/dateutil.service';
import { AgendadorEventEmmiterService } from 'src/app/services/agendadoreventemmiter.service';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './dialogoevento.component.html',
  styleUrls: ['./dialogoevento.component.css']
})
export class DialogoeventoComponent implements OnInit, AfterViewInit {

  resultsCliente: string[];
  servicos: SelectItemRN[] = [];
  profissionais: SelectItem[] = [];
  mensagensValidacao: string[] = [];
  agendamento: any = { profissional: {} };
  faturamento: any = { tipoDesconto: 'PERCENTUAL' };
  pt: any;
  displayDialogNovoCliente = false;
  displayDialogFaturamento = false;

  @ViewChild('proDD', { static: true }) proDD: Dropdown;

  constructor(private dialogoEventoService: DialogoeventoService, private appService: AppService, private agendadorEmiter: AgendadorEventEmmiterService) {

  }

  ngOnInit() {
    EventEmitterService.get('dialogoNovoEvento').subscribe(data => {
      if (data instanceof Date) {
        this.resetAgendamento()
        this.agendamento.dataInicio = data
      } if (data instanceof Evento) {
        this.appService.requestGet('/evento/buscar/' + data._id).subscribe(data => {
          this.carregarAgendamento(data)
        })
      } else {
        switch (data) {
          case "salvar":
            this.salvar();
            break;
          case ("EM_ATENDIMENTO"):
            this.atualizarStatus(data);
            break;
          case ("NAO_COMPARECEU"):
            this.atualizarStatus(data);
            break;
          case ("FECHAR_FATURAR"):
            this.abrirFaturamento();
            break;
          case "cancelar":
            this.cancelar();
            break;
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
    EventEmitterService.get('dialogoNovoEvento').unsubscribe();
    EventEmitterService.get('dialogoNovoCliente').unsubscribe();
  }

  carregarAgendamento(evento) {
    this.resetAgendamento()
    this.agendamento.id = evento.id;
    this.agendamento.observacoes = evento.observacoes
    this.agendamento.dataInicio = new Date(evento.dataInicio)
    if (evento.profissional) { this.agendamento.profissional = evento.profissional }
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
      let dataInicio = this.agendamento.dataInicio
      this.agendamento.dataInicio = DateUtilService.localToUtc(dataInicio)
      this.appService.requestPost(this.agendamento.id ? '/evento/alterar' : '/evento/inserir', this.agendamento).subscribe(data => {
        this.appService.msgSucesso('Agendamento salvo com sucesso!');
        this.resetAgendamento()
        EventEmitterService.get('dialogoNovoEvento').emit('salvou');
      },
        error => this.agendamento.dataInicio = dataInicio);
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
    this.dialogoEventoService.listarServicos().subscribe(data => {
      data.entidade.forEach(element => {
        this.servicos.push({ label: element.nome, value: element.id, valor: element.valor });
      });
    });

    this.dialogoEventoService.listarProfissionais().subscribe(data => {
      data.forEach(element => {
        this.profissionais.push({ label: element.nome, value: element.id });
      });
    });
  }

  searchCliente(event) {
    this.dialogoEventoService.searchCliente(event).subscribe(data => {
      data.forEach(cliente => {
        this.setFoneNome(cliente);
      });
      this.resultsCliente = data;
    });
  }

  setFoneNome(cliente) {
    cliente.fone_nome = ''.concat(cliente.telefone.concat(' - ').concat(cliente.nome))
  }

  resetAgendamento() {
    this.agendamento = { profissional: {} }
  }

  atualizarStatus(status) {
    let statusAgendamento = {
      idEvento: this.agendamento.id,
      status: status
    }
    this.appService.requestPost('/evento/alterar_status', statusAgendamento).subscribe(data => {
      this.appService.msgSucesso('Status alterado com sucesso!');
      EventEmitterService.get('dialogoNovoEvento').emit('salvou');
    })
  }

  abrirFaturamento() {
    this.faturamento.dinheiro = this.agendamento.valor
    this.displayDialogFaturamento = true
  }

  faturar() {
    let faturar = {
      faturamento: this.faturamento,
      agendamento: this.agendamento
    }
    this.appService.requestPost('/faturamento/faturar', faturar).subscribe(data => {
      if (data.comandas.length != 0) {
        this.appService.msgSucesso('Agendamento faturado com sucesso!');
        this.displayDialogFaturamento = false
        EventEmitterService.get('dialogoNovoEvento').emit('salvou');
      }
    })
  }

  cancelarFaturamento() {
    this.displayDialogFaturamento = false
  }

  getValorRecebido() {
    let dinheiro = this.toFloat(this.faturamento.dinheiro)
    let credito = this.toFloat(this.faturamento.credito)
    let debito = this.toFloat(this.faturamento.debito)
    let resultado: number = (dinheiro + credito + debito)
    if (this.faturamento.desconto && this.faturamento.tipoDesconto) {
      resultado = this.descontar(resultado)
    }
    let resultadoFormatado = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(resultado)
    this.faturamento.recebido = resultado
    return resultado ? resultadoFormatado : 0
  }

  descontar(valor: number): number {
    if (this.faturamento.tipoDesconto == 'PERCENTUAL') {
      valor = valor - ((this.faturamento.desconto / 100) * valor)
    } else {
      valor = valor - this.faturamento.desconto
    }
    return valor
  }

  tudoDinheiro() {
    this.faturamento.dinheiro = this.agendamento.valor
    this.faturamento.debito = undefined
    this.faturamento.credito = undefined
  }
  tudoDebito() {
    this.faturamento.debito = this.agendamento.valor
    this.faturamento.credito = undefined
    this.faturamento.dinheiro = undefined
  }
  tudoCredito() {
    this.faturamento.credito = this.agendamento.valor
    this.faturamento.debito = undefined
    this.faturamento.dinheiro = undefined
  }

  toFloat(valor) {
    let double = 0
    if (valor) {
      double = parseFloat(valor)
    }
    return double
  }
}

export interface SelectItemRN extends SelectItem {
  valor: any;
}
