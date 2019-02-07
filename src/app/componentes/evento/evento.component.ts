import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'rn-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class Evento implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, ButtonModule, DragDropModule],
  exports: [Evento],
  declarations: [Evento],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventoModule { }
