import { Component, OnInit } from '@angular/core';
import { CriareventoService } from './criarevento.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css'],

})
export class CriareventoComponent implements OnInit {

  public cliente?: any = {};
  text: string;
  results: string[];
  servicos: SelectItem[];

  constructor(private criarEventoService: CriareventoService) { }

  ngOnInit() {
  }

  searchCliente(event) {
    this.criarEventoService.searchCliente(event).subscribe(data => {
      this.results = data;
    });
  }
}
