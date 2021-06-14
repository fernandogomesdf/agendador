import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from './login.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login?: any = {};
  public cadastro?: any = {};
  public isCadastro = false;
  tiposEstabelecimento: SelectItem[];

  @ViewChild('meuFormCadastro', { static: false }) meuFormCadastro: ElementRef;
  @ViewChild('meuFormLogin', { static: false }) meuFormLogin: ElementRef;

  constructor(public service: LoginService, private appService: AppService, private router: Router) {
    this.tiposEstabelecimento = [
      { label: 'Selecione o tipo de estabelecimento', value: null },
      { label: 'Salão de Beleza', value: 'SALAO' },
      { label: 'Clínica de Estética', value: 'ESTETICA' },
      { label: 'Consultório Odontológico', value: 'ODONTOLOGICO' },
      { label: 'Consultório Psicológico', value: 'PSICOLOGICO' },
      { label: 'Barbearia', value: 'BARBEARIA' },
      { label: 'Pet Shop', value: 'PET' },
      { label: 'Lava Jato', value: 'LAVA_JATO' },
      { label: 'Outro', value: 'OUTRO' }
    ];
  }

  ngOnInit() {
  }

  efetuarLogin() {
    if (!this.login.emailoucpf) {
      this.appService.msgWarn("Informe E-mail ou CPF.");
    } else if (!this.login.senha) {
      this.appService.msgWarn("Informe a senha.");
    } else {
      this.service.login(this.login).subscribe(result => {
        if (result.token) {
          sessionStorage.setItem('token', result.token);
          sessionStorage.setItem('nome', result.entidade.nome);
          let rotaRequerida = sessionStorage.getItem('rotarequerida');
          if (rotaRequerida) {
            rotaRequerida = '/' + rotaRequerida.replace(/,/g, "/");
            this.router.navigate([rotaRequerida]);
          } else {
            this.router.navigate(['/']);
          }
          sessionStorage.removeItem('rotarequerida');
        }
      });
    }
  }

  clickCadastro() {
    this.isCadastro = true;
  }

  cadastrar() {
    if (!this.cadastro.nome) {
      this.appService.msgWarn("Informe o nome completo.");
    } else if (!this.cadastro.cpf) {
      this.appService.msgWarn("Informe o CPF.");
    } else if (!this.cadastro.email) {
      this.appService.msgWarn("Informe o e-mail.");
    } else if (!this.cadastro.nome_estabelecimento) {
      this.appService.msgWarn("Informe o nome do estabelecimento.");
    } else if (!this.cadastro.tipo_estabelecimento) {
      this.appService.msgWarn("Informe o tipo do estabelecimento.");
    } else if (!this.cadastro.senha) {
      this.appService.msgWarn("Informe a senha.");
    } else if (this.cadastro.email != this.cadastro.repitaemail) {
      this.appService.msgWarn("O e-mails são diferentes");
    } else if (this.cadastro.senha != this.cadastro.repitasenha) {
      this.appService.msgWarn("As senhas são diferentes");
    } else {
      this.service.cadastrar(this.cadastro).subscribe(result => {
        this.cadastro = {};
        this.login = {};
        this.meuFormCadastro.nativeElement.reset();
        this.isCadastro = false;
      });
    }
  }

  cancelar() {
    this.isCadastro = false;
  }
}

