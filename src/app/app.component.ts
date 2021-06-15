import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public blocked: boolean = false;
  title = 'rennova-web';
  @ViewChild('drawer', { static: true }) drawer: any;

  constructor(public loginGuard: LoginGuard,
    public router: Router,
    private appService: AppService,
    private cdRef: ChangeDetectorRef,
    private config: PrimeNGConfig) {
    appService.blockEmitter.subscribe(result => {
      this.blocked = result.value;
    });
  }

  ngOnInit() {
    //this.translateService.setDefaultLang('pt');
    this.config.setTranslation({
      "startsWith": "Começa com",
      "contains": "Contém",
      "notContains": "Não contem",
      "endsWith": "Termina com",
      "equals": "Igual",
      "notEquals": "Não igual",
      "noFilter": "Sem filtro",
      "lt": "Menos que",
      "lte": "Less than or equal to",
      "gt": "Greater than",
      "gte": "Great then or equals",
      "is": "Is",
      "isNot": "Is not",
      "before": "Before",
      "after": "After",
      "clear": "Clear",
      "apply": "Apply",
      "matchAll": "Match All",
      "matchAny": "Match Any",
      "addRule": "Add Rule",
      "removeRule": "Remove Rule",
      "accept": "Sim",
      "reject": "Não",
      "choose": "Escolher",
      "upload": "Upload",
      "cancel": "Cancelar",
      "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      "dayNamesMin": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "today": "Today",
      "weekHeader": "Wk",
      "weak": 'Weak',
      "medium": 'Medium',
      "strong": 'Strong',
      "passwordPrompt": 'Enter a password',
      "emptyMessage": 'No results found',
      "emptyFilterMessage": 'No results found'
    });
  }

  getNomeUsuario() {
    return sessionStorage.getItem('nome')
  }

  sair() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nome');
    this.router.navigate(['publico/login']);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
