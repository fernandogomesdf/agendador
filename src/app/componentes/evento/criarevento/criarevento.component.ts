import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'rn-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css'],

})
export class CriareventoComponent implements OnInit {

  public cliente?: any = {};
  text: string;
  results: string[];

  constructor() { }

  ngOnInit() {
  }

}
