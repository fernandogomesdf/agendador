import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicoRoutingModule } from './publico-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { CardModule, DropdownModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    PublicoRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    PasswordModule,
    CardModule,
    DropdownModule
  ],
  providers: [LoginService],
  declarations: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PublicoModule { }
