import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/service/eventemitter.service';
import { AppService } from 'src/app/app.service';
import moment from 'moment';

@Component({
  selector: 'rn-criarcliente',
  templateUrl: './criarcliente.component.html',
  styleUrls: ['./criarcliente.component.css']
})
export class CriarclienteComponent implements OnInit {

  cliente: any = {};
  mensagensValidacao: string[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    EventEmitterService.get('dialogoNovoCliente').subscribe(data => {
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
  }

  cancelar() {
    EventEmitterService.get('dialogoNovoCliente').emit('fechar');
  }

  salvar() {
    if (this.isValido()) {
      this.appService.requestPost('/cliente/inserir', this.cliente).subscribe(data => {
        if (data.id) {
          this.cliente = {};
          this.appService.msgSucesso('Cliente incluído com sucesso!');
          EventEmitterService.get('dialogoNovoCliente').emit('fechar');
          EventEmitterService.get('dialogoNovoCliente').emit(data);
        }
      });
    }
  }

  isValido(): boolean {
    this.mensagensValidacao = [];
    if (!this.cliente.nome) {
      this.mensagensValidacao.push("É necessário informar o nome do cliente.");
    }
    if (!this.cliente.telefone) {
      this.mensagensValidacao.push("É necessário informar o telefone do cliente.");
    } else if (this.cliente.telefone.length != 15) {
      this.mensagensValidacao.push("Telefone do cliente inválido.");
    }
    if (this.cliente.cpf && this.cliente.cpf.length != 14) {
      this.mensagensValidacao.push("O CPF é inválido.");
    }
    if (this.cliente.diaMesAniversario && this.cliente.diaMesAniversario.length != 5) {
      this.mensagensValidacao.push("A data de aniversário é inválida.");
    } else if (this.cliente.diaMesAniversario && this.cliente.diaMesAniversario.length == 5) {
      let diames = this.cliente.diaMesAniversario.split('/');
      var date = moment("2000-" + diames[1] + "-" + diames[0]);
      if (!date.isValid()) {
        this.mensagensValidacao.push("A data de aniversário é inválida.");
      }
    }
    for (let entry of this.mensagensValidacao) {
      this.appService.msgWarn(entry)
    }
    return this.mensagensValidacao.length == 0;
  }
}
