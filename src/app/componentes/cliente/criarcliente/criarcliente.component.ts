import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/service/eventemitter.service';

declare const moment: any;

@Component({
  selector: 'rn-criarcliente',
  templateUrl: './criarcliente.component.html',
  styleUrls: ['./criarcliente.component.css']
})
export class CriarclienteComponent implements OnInit {

  cliente: any = {};
  mensagensValidacao: string[] = [];

  constructor() { }

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
        default: {
          console.log("opção indefinida....");
          break;
        }
      }
    });
  }

  cancelar() {
    alert('cancelar');
  }

  salvar() {
    console.log(JSON.stringify(this.cliente));
    if (this.isValido()) {

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
      alert(entry);
    }
    return this.mensagensValidacao.length == 0;
  }
}
