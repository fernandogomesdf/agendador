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
  displayDialog: boolean;
  entidade: any;
  mensagensValidacao: string[] = [];
  tituloDialog;

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
    this.entidade = {}
    this.entidade.comissao = {}
    this.entidade.categoria = {}
    this.entidade.comissao.tipo = 'PERCENTUAL'

    this.appService.requestPost('/categoria/buscar', '{ first: 0, rows: 200 }').subscribe(data => {
      data.entidade.forEach(element => {
        this.categorias.push({ label: element.nome, value: element.id });
      });
    })
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
    this.displayDialog = true
    this.ngOnInit()
  }

  salvar() {
    if (this.isValido()) {
      if (this.entidade.id) {
        this.appService.requestPost('/servico/alterar', this.entidade).subscribe(data => {
          this.fecharEAtualizar()
          this.appService.msgSucesso('Serviço alterado com sucesso!')
        })
      } else {
        this.appService.requestPost('/servico/inserir', this.entidade).subscribe(data => {
          this.fecharEAtualizar()
          this.appService.msgSucesso('Serviço incluído com sucesso!')
        })
      }
    }
  }

  private fecharEAtualizar() {
    this.ngOnInit();
    this.dataTable.reset();
    this.displayDialog = false;
  }

  isValido() {
    this.mensagensValidacao = [];
    if (!this.entidade.nome) {
      this.mensagensValidacao.push("É necessário informar o nome do serviço.");
    }
    if (!this.entidade.categoria.id) {
      this.mensagensValidacao.push("É necessário informar a categoria serviço.");
    }
    if (!this.entidade.valor) {
      this.mensagensValidacao.push("É necessário informar o valor do serviço.");
    }
    if (!this.entidade.comissao.valor) {
      this.mensagensValidacao.push("É necessário informar o valor da comissão do serviço.");
    }
    if (!this.entidade.comissao.tipo) {
      this.mensagensValidacao.push("É necessário informar o tipo da comissão do serviço.");
    }
    if (!this.entidade.duracao) {
      this.mensagensValidacao.push("É necessário informar a duração do serviço.");
    }
    for (let entry of this.mensagensValidacao) {
      this.appService.msgWarn(entry)
    }
    return this.mensagensValidacao.length == 0;
  }

  cancelar() {
    this.displayDialog = false
  }

  selecionaEditar(item) {
    this.entidade = Object.assign({}, item)
    this.displayDialog = true
  }

  carregarDados(event: LazyLoadEvent) {
    this.loading = true;
    this.appService.requestPost('/servico/buscar', event).subscribe(data => {
      this.valores = data.entidade
      this.totalRecords = data.totalRecords
      this.loading = false;
    })
  }
}
