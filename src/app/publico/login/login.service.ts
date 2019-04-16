import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  private response: Observable<any>;

  constructor(private appService: AppService) { }

  login(login: any) {
    this.response = this.appService.requestPost('/usuario/login', login);
    return this.response;
  }

  cadastrar(cadastro: any) {
    this.response = this.appService.requestPost('/usuario/inserir', cadastro);
    this.response.subscribe(result => {
      this.appService.msgSucesso("Seu cadastro foi realizado com sucesso!");
    });
    return this.response;
  }

}
