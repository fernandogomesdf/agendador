import { Component, OnInit, AfterViewInit, ApplicationRef, ViewChild } from '@angular/core';
import { CriareventoService } from './criarevento.service';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css']
})
export class CriareventoComponent implements OnInit, AfterViewInit {

  public cliente?: any = {};

  resultsCliente: string[];
  servicos: SelectItem[] = [];
  profissionais: SelectItem[] = [];
  selectedServicos: string[] = [];
  selectedProfissional: string;
  selectedCliente: string;

  @ViewChild('proDD') proDD: Dropdown;

  constructor(private criarEventoService: CriareventoService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.criarEventoService.listarServicos().subscribe(data => {
      data.forEach(element => {
        this.servicos.push({ label: element.nome, value: element.id });
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
      this.resultsCliente = data;
    });
  }
}
