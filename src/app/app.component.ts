import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public blocked: boolean = false;
  title = 'rennova-web';
  items: MenuItem[];

  constructor(public loginGuard: LoginGuard, public router: Router, private appService: AppService, private cdRef: ChangeDetectorRef) {
    appService.blockEmitter.subscribe(result => {
      this.blocked = result.value;
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Agendamentos',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['gestao/calendario_alternativo']
      },
      {
        label: 'Serviços',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['gestao/servicos']
      }
    ];
  }

  sair() {
    sessionStorage.removeItem('token');
    this.router.navigate(['publico/login']);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
