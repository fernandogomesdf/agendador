import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-crud-servico',
  templateUrl: './crud-servico.component.html',
  styleUrls: ['./crud-servico.component.css']
})
export class CrudServicoComponent implements OnInit {

  cols: any[];
  valores: any[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'preco', header: 'Preço' },
      { field: 'tempo', header: 'Tempo (minutos)' },
      { field: 'categoria', header: 'Categoria' }
    ];

    this.appService.requestPost('/servico/buscar', 'minhaquery').subscribe(data => {
      this.valores = data;
    });
  }
}
