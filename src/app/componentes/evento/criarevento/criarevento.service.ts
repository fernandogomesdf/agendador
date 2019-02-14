import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class CriareventoService {

  private response: Observable<any>;
  public resposta?: any = [{}];

  constructor(private appService: AppService) { }

  searchCliente(event: any): any {
    this.response = this.appService.requestPost('/cliente/buscar', event.query);
    return this.response;
  }
}
