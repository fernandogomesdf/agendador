import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class DialogoeventoService {

  constructor(private appService: AppService) { }

  searchCliente(event: any): any {
    return this.appService.requestPost('/cliente/buscar', event.query);
  }

  listarServicos(): any {
    return this.appService.requestPost('/servico/buscar', '{first:0, rows:200}');
  }

  listarServicosSelecionados(servicos): any {
    return this.appService.requestPost('/servico/buscar', '{first:0, rows:200, servicos : '+ JSON.stringify(servicos) +'}');
  }

  listarProfissionais(): any {
    return this.appService.requestPost('/profissional/buscar', '{first:0, rows:200}');
  }
}
