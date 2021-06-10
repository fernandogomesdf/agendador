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

  constructor(public loginGuard: LoginGuard, public router: Router, private appService: AppService, private cdRef: ChangeDetectorRef) {
    appService.blockEmitter.subscribe(result => {
      this.blocked = result.value;
    });
  }

  ngOnInit() {
    
  }

  sair() {
    sessionStorage.removeItem('token');
    this.router.navigate(['publico/login']);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
