import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-crud-servico',
  templateUrl: './crud-servico.component.html',
  styleUrls: ['./crud-servico.component.css']
})
export class CrudServicoComponent implements OnInit {

  cols: any[];
  valores: any[];
  categorias: SelectItem[] = [];
  totalRecords: number;
  loading: boolean;
  displayDialogNovo: boolean;
  entidade: any = {};
  mensagensValidacao: string[] = [];

  @ViewChild("dt", { static: true }) dataTable: Table;

  constructor(private cp: CurrencyPipe, private appService: AppService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'valor', header: 'Valor', type: this.cp, arg1: 'BRL' },
      { field: 'duracao', header: 'Duração (minutos)' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'categoria', header: 'Categoria' }
    ];
    this.entidade.comissao = {}
    this.entidade.categoria = {}
    this.entidade.comissao.tipo = 'PERCENTUAL'
  }

  confirmaExcluir(item) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.appService.requestGet('/servico/excluir/' + item.id).subscribe(data => {
          if (data.deletedCount > 0) {
            this.appService.msgSucesso('Registro excluído com sucesso!')
            this.dataTable.reset()
          }
        })
      },
      reject: () => {
      }
    })
  }

  loadValoresLazy(event: LazyLoadEvent) {
    this.carregarDados(event)
  }

  novo() {
    this.displayDialogNovo = true
  }

  salvar() {
    if (this.isValido()) {

    }
  }

  isValido() {
    this.mensagensValidacao = [];
    if (!this.entidade.nome) {
      this.mensagensValidacao.push("É necessário informar o nome do serviço.");
    }
    if (!this.entidade.categoria.id) {
      this.mensagensValidacao.push("É necessário informar a categoria serviço.");
    }
    for (let entry of this.mensagensValidacao) {
      this.appService.msgWarn(entry)
    }
    return this.mensagensValidacao.length == 0;
  }

  cancelar() {
    this.displayDialogNovo = false
  }

  carregarDados(event: LazyLoadEvent) {
    this.loading = true;
    this.appService.requestPost('/servico/buscar', event).subscribe(data => {
      this.valores = data.entidade
      this.totalRecords = data.totalRecords
      this.loading = false;
    })

    this.appService.requestPost('/categoria/buscar', '{ first: 0, rows: 200 }').subscribe(data => {
      data.entidade.forEach(element => {
        this.categorias.push({ label: element.nome, value: element.id });
      });
      this.totalRecords = data.totalRecords
    })
  }
}
