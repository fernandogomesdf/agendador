import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
import { MenubarModule } from 'primeng/menubar';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from 'primeng/fieldset';
import { EditorModule } from 'primeng/editor';
import { BlockUIModule } from 'primeng/blockui';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayModule } from '@angular/cdk/overlay';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

registerLocaleData(localeBr)

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
    EditorModule,
    BlockUIModule,
    InputNumberModule,
    OverlayModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [AppService, MessageService, ConfirmationService, { provide: LOCALE_ID, useValue: 'pt' }],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }