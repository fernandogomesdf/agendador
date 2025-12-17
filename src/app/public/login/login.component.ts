import { Component, inject } from '@angular/core';
import { CommonsModule } from '../../commons/commons.module';
import { AppService } from '../../app.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login?: any = {};
  email: string = '';
  password: string = '';
  lembrar: boolean = false;
  loading: boolean = false;

  private appService = inject(AppService)
  public service = inject(LoginService)
  public router = inject(Router)
  public messageService = inject(MessageService)

  async efetuarLogin(): Promise<void> {
    try {
      this.loading = true;
      if (!this.login?.emailoucpf?.trim()) {
        this.appService.msgWarn('Informe E-mail ou CPF');
        this.loading = false;
        return;
      }

      if (!this.login?.senha?.trim()) {
        this.appService.msgWarn('Informe a senha');
        this.loading = false;
        return;
      }

      const response = await this.service.login(this.login);

      response.subscribe({
        next: (result: any) => {
          if (!result?.token) {
            this.appService.msgWarn('Login inválido');
            this.loading = false;
            return;
          }

          this.salvarDadosSessao(result);
          this.redirecionarUsuario();
        },
        error: (err: any) => {
          console.error('Erro no login:', err);
          this.appService.msgWarn('Erro ao realizar login. Verifique suas credenciais.');
          this.loading = false;
        },
        complete: () => {
          // Loading will be handled by redirection or error
        }
      });
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
      this.appService.msgWarn('Erro ao realizar login. Tente novamente.');
      this.loading = false;
    }
  }

  private salvarDadosSessao(result: any): void {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('nome', result.entidade.nome);
      } catch { }
    }
  }

  private async redirecionarUsuario(): Promise<void> {
    const rotaRequerida = (typeof window !== 'undefined') ? sessionStorage.getItem('rotarequerida') : null;
    try {
      if (rotaRequerida) {
        const segmentos = rotaRequerida.split(',').filter(s => !!s);
        await this.router.navigate(['/', ...segmentos]);
      } else {
        await this.router.navigate(['/gestao/agendamentos']);
      }
    } finally {
      if (typeof window !== 'undefined') {
        try { sessionStorage.removeItem('rotarequerida'); } catch { }
      }
      this.loading = false;
    }
  }
}
