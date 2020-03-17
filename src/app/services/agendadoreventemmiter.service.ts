import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendadorEventEmmiterService {

  private dialogoEvento = new Subject<string>();
  dialogoEvento$ = this.dialogoEvento.asObservable();

  constructor() { }

  emit(mensagem: string) {
    this.dialogoEvento.next(mensagem);
  }
}
