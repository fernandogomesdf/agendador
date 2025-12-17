import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { AppService } from '../app.service';
import { LoginService } from '../public/login/login.service';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { Message } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePicker } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { InputNumberModule } from 'primeng/inputnumber';


import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Message,
    Select,
    DatePicker
  ],
  exports: [
    ButtonModule,
    FormsModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    BlockUIModule,
    ToastModule,
    Message,
    CardModule,
    AutoCompleteModule,
    MultiSelectModule,
    Select,
    EditorModule,
    InputMaskModule,
    RadioButtonModule,
    DatePicker,
    DialogModule,
    AccordionModule,
    TabsModule,
    InputNumberModule,
    TableModule,
    ConfirmDialogModule,
    ConfirmDialogModule,
    FullCalendarModule
  ],
  providers: [AppService, LoginService]
})
export class CommonsModule { }
