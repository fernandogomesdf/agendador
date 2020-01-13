import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { EventEmitterService } from 'src/app/service/eventemitter.service';

@Component({
  selector: 'rn-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  static alturaDivEvento = 22;
  static alturaEntreLinha = 3;


  @Input() id: string;

  constructor() {

    /*interact('.evento').resizable({
      // resize from all edges and corners
      edges: { left: false, right: false, bottom: true, top: false },
    }).on('resizemove', function (event: any) {
      var target = event.target;
      target.style.height = event.rect.height + 'px';

    }).on('resizeend', function (event: any) {
      var target = event.target;
      let alturaRequerida = event.target.clientHeight;

      if (event.target.clientHeight < EventoComponent.alturaDivEvento) {
        target.style.height = EventoComponent.alturaDivEvento + 'px';
      } else {
        let totalLinhas = Math.round(alturaRequerida / EventoComponent.alturaDivEvento);
        let novaAltura = totalLinhas * EventoComponent.alturaDivEvento + (totalLinhas * EventoComponent.alturaEntreLinha);
        novaAltura -= EventoComponent.alturaEntreLinha;
        target.style.height = novaAltura + 'px';
      }
    });*/
  }

  ngOnInit() {
  }

  dragStart(event) {
    EventEmitterService.get('dndElement').emit(event.srcElement);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule, ButtonModule, DragDropModule],
  exports: [EventoComponent],
  declarations: [EventoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventoModule { }
