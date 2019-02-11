import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css'],

})
export class CriareventoComponent implements OnInit {

  cliente = "Fernando";
  @ViewChild('meuForm') meuForm: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
