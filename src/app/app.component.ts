import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { LoginGuard } from './guards/login.guard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public blocked: boolean = false;
  title = 'rennova-web';
  @ViewChild('drawer', { static: true }) drawer: any;

  constructor(public loginGuard: LoginGuard, public router: Router, private appService: AppService, private cdRef: ChangeDetectorRef) {
    appService.blockEmitter.subscribe(result => {
      this.blocked = result.value;
    });
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.cdRef.detectChanges()
    this.drawer.toggle()
    this.cdRef.detectChanges()
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
