import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
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
  totalRecords: number;
  loading: boolean;
  displayDialogNovo: boolean;
  entidade: any = {};

  @ViewChild("dt", { static: true }) dataTable: Table;

  constructor(private cp: CurrencyPipe, private appService: AppService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'preco', header: 'Preço', type: this.cp, arg1: 'BRL' },
      { field: 'duracao', header: 'Duração (minutos)' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'categoria', header: 'Categoria' }
    ];
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

  cancelarNovo() {
    this.displayDialogNovo = false
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
