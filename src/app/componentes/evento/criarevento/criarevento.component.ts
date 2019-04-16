import { Component, OnInit, AfterViewInit, ApplicationRef, ViewChild, Input } from '@angular/core';
import { CriareventoService } from './criarevento.service';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { EventEmitterService } from 'src/app/service/eventemitter.service';
import { AppService } from 'src/app/app.service';

declare const moment: any;

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

  displayDialogNovoCliente = false;

  @ViewChild('proDD') proDD: Dropdown;

  constructor(private criarEventoService: CriareventoService, private appService: AppService) {

  }

  ngOnInit() {
    EventEmitterService.get('dialogoNovoEvento').subscribe(data => {
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
    });

    EventEmitterService.get('dialogoNovoCliente').subscribe(data => {
      switch (data) {
        case "fechar": {
          this.displayDialogNovoCliente = false;
          break;
        }
        default: {
          this.agendamento.cliente = data;
          break;
        }
      }
    });
  }

  ngOnDestroy() {

  }

  atualizarPrecoAgendamento(event) {
    let servicosSelecionados = this.agendamento.servicos;
    let precoAgendamento: number = 0;
    this.servicos.filter(function (item) {
      return servicosSelecionados.includes(item.value)
    }).forEach(elemento => {
      precoAgendamento += elemento.preco;
    })
    this.agendamento.valor = precoAgendamento;
  }

  salvar() {
    if (this.isValido()) {
      this.appService.requestPost('/evento/inserir', this.agendamento).subscribe(data => {
        this.appService.msgSucesso('Novo agendamento realizado com sucesso!');
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

    if (!this.agendamento.data) {
      this.mensagensValidacao.push("É necessário informar a data.");
    }

    /*if (!this.agendamento.hora) {
      this.mensagensValidacao.push("É necessário informar a hora.");
    }*/

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
      data.forEach(element => {
        this.servicos.push({ label: element.nome, value: element.id, preco: element.preco });
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
      data.forEach(element => {
        element.fone_nome = ''.concat(element.telefone.concat(' - ').concat(element.nome))
      });
      this.resultsCliente = data;
    });
  }
}

export interface SelectItemRN extends SelectItem {
  preco: any;
}
