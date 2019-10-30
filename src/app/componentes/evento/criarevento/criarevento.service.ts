import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class CriareventoService {

  constructor(private appService: AppService) { }

  searchCliente(event: any): any {
    return this.appService.requestPost('/cliente/buscar', event.query);
  }

  listarServicos(): any {
    return this.appService.requestPost('/servico/buscar', '{first:0, rows:200}');
  }

  listarProfissionais(): any {
    return this.appService.requestPost('/profissional/buscar', '{first:0, rows:200}');
  }
}
