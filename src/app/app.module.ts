import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { GestaoModule } from './gestao/gestao.module';
import { CursosModule } from './cursos/cursos.module';
import { PublicoModule } from './publico/publico.module';
import { routing } from './routes/app.routes';

import { DragDropModule } from 'primeng/dragdrop';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    routing,
    BrowserModule,
    GestaoModule,
    CursosModule,
    PublicoModule,
    ButtonModule,
    DragDropModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
