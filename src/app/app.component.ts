import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonsModule } from './commons/commons.module';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public blocked: boolean = false;
  private appService = inject(AppService)

  title = 'Agendador';

  constructor() {
    this.appService.blockEmitter.subscribe(result => {
      this.blocked = result.value;
    });
  }
}
