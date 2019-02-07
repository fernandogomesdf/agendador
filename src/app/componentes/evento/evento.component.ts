import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import * as interact from 'interactjs';
import { EventEmitterService } from 'src/app/service/eventemitter.service';

@Component({
  selector: 'rn-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class Evento implements OnInit {

  static alturaDivEvento = 22;
  static alturaEntreLinha = 3;

  constructor() {

    interact('.evento').resizable({
      // resize from all edges and corners
      edges: { left: false, right: false, bottom: true, top: false },
    }).on('resizemove', function (event: any) {
      var target = event.target;
      target.style.height = event.rect.height + 'px';

    }).on('resizeend', function (event: any) {
      var target = event.target;
      let alturaRequerida = event.target.clientHeight;

      if (event.target.clientHeight < Evento.alturaDivEvento) {
        target.style.height = Evento.alturaDivEvento + 'px';
      } else {
        let totalLinhas = Math.round(alturaRequerida / Evento.alturaDivEvento);
        let novaAltura = totalLinhas * Evento.alturaDivEvento + (totalLinhas * Evento.alturaEntreLinha);
        novaAltura -= Evento.alturaEntreLinha;
        target.style.height = novaAltura + 'px';
      }
    });
  }

  ngOnInit() {
  }

  dragStart(event) {
    EventEmitterService.get('dndElement').emit(event.srcElement);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, ButtonModule, DragDropModule],
  exports: [Evento],
  declarations: [Evento],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventoModule { }
