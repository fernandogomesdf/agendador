import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DataTable } from 'primeng/primeng';

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

  @ViewChild("dt", { static: true }) dataTable: DataTable;

  constructor(private appService: AppService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'preco', header: 'Preço' },
      { field: 'tempo', header: 'Tempo (minutos)' },
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

  carregarDados(event: LazyLoadEvent) {
    this.loading = true;
    this.appService.requestPost('/servico/buscar', event).subscribe(data => {
      this.valores = data.entidade
      this.totalRecords = data.totalRecords
      this.loading = false;
    })
  }
}
