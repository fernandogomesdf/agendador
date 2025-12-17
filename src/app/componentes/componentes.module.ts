import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DialogoeventoComponent } from './dialogoevento/dialogoevento.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Select } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import localeBr from '@angular/common/locales/pt';


import { CommonsModule } from '../commons/commons.module';

registerLocaleData(localeBr)

@NgModule({
    imports: [
        CommonModule,
        CommonsModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        AutoCompleteModule,
        Select,
        MultiSelectModule,
        DatePicker,
        InputTextModule,
        InputNumberModule,
        CurrencyMaskModule,
        DialogoeventoComponent
    ],
    declarations: [],
    exports: [DialogoeventoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }]
})
export class ComponentesModule { }
