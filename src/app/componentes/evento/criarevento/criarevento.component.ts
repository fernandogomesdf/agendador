import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CriareventoService } from './criarevento.service';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css'],

})
export class CriareventoComponent implements OnInit {

  public cliente?: any = {};
  text: string;
  results: string[];

  constructor(private criarEventoService: CriareventoService) { }

  ngOnInit() {
  }

  searchCliente(event) {
    this.criarEventoService;
  }
}
