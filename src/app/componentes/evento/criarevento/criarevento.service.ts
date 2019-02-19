import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.appService.requestPost('/servico/buscar', 'minhaquery');
  }

  listarProfissionais(): any {
    return this.appService.requestPost('/profissional/buscar', 'minhaquery');
  }
}
