import { Component, OnInit, AfterViewInit, ApplicationRef, ViewChild, Input } from '@angular/core';
import { CriareventoService } from './criarevento.service';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { EventEmitterService } from 'src/app/service/eventemitter.service';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css']
})
export class CriareventoComponent implements OnInit, AfterViewInit {

  resultsCliente: string[];
  servicos: SelectItem[] = [];
  profissionais: SelectItem[] = [];
  selectedServicos: string[] = [];

  agendamento: any = {};

  displayDialogNovoCliente = false;

  @ViewChild('proDD') proDD: Dropdown;

  constructor(private criarEventoService: CriareventoService) {
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

  salvar() {
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
