import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private response!: Observable<any>;

  constructor(private appService: AppService) { }

  login(login: any) {
    this.response = this.appService.requestPost('/usuario/login', login);
    return this.response;
  }

  cadastrar(cadastro: any) {
    this.response = this.appService.requestPost('/usuario/cadastrar', cadastro);
    this.response.subscribe(result => {
      this.appService.msgSucesso("Seu cadastro foi realizado com sucesso!");
    });
    return this.response;
  }

}
