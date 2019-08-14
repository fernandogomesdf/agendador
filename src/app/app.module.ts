import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { GestaoModule } from './gestao/gestao.module';
import { CursosModule } from './cursos/cursos.module';
import { PublicoModule } from './publico/publico.module';
import { ComponentesModule } from './componentes/componentes.module';
import { routing } from './routes/app.routes';

import { DragDropModule } from 'primeng/dragdrop';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AppService } from './app.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule, FieldsetModule, EditorModule } from 'primeng/primeng';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GestaoModule,
    CursosModule,
    PublicoModule,
    ComponentesModule,
    ButtonModule,
    DragDropModule,
    AutoCompleteModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    ConfirmDialogModule,
    FieldsetModule,
    EditorModule
  ],
  providers: [AppService, MessageService, ConfirmationService, { provide: LOCALE_ID, useValue: 'pt' }],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }