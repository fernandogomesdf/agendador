import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rn-criarcliente',
  templateUrl: './criarcliente.component.html',
  styleUrls: ['./criarcliente.component.css']
})
export class CriarclienteComponent implements OnInit {

  cliente: any = {};

  constructor() { }

  ngOnInit() {
  }

}
