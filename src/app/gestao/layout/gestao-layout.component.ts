import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-gestao-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        DrawerModule,
        ButtonModule,
        AvatarModule,
        RippleModule,
        StyleClassModule,
        PanelMenuModule
    ],
    templateUrl: './gestao-layout.component.html',
    styleUrls: ['./gestao-layout.component.scss']
})
export class GestaoLayoutComponent implements OnInit {

    sidebarVisible: boolean = false;
    userName: string = 'Usuário';
    menuItems: MenuItem[] = [];

    constructor(private router: Router) { }

    ngOnInit() {
        this.updateUserName();
        this.menuItems = [
            {
                label: 'Agendamentos',
                icon: 'pi pi-calendar',
                routerLink: ['/gestao/agendamentos'],
                command: () => this.sidebarVisible = false
            },
            {
                label: 'Serviços',
                icon: 'pi pi-briefcase',
                routerLink: ['/gestao/servicos'],
                command: () => this.sidebarVisible = false
            },
            {
                label: 'Meus Dados',
                icon: 'pi pi-folder',
                items: [
                    { label: 'Caixas', icon: 'pi pi-inbox', routerLink: ['/gestao/caixas'], command: () => this.sidebarVisible = false },
                    { label: 'Categorias', icon: 'pi pi-tags', routerLink: ['/gestao/categorias'], command: () => this.sidebarVisible = false },
                    { label: 'Clientes', icon: 'pi pi-user', routerLink: ['/gestao/clientes'], command: () => this.sidebarVisible = false },
                    { label: 'Comandas', icon: 'pi pi-ticket', routerLink: ['/gestao/comandas'], command: () => this.sidebarVisible = false },
                    { label: 'Estabelecimentos', icon: 'pi pi-building', routerLink: ['/gestao/estabelecimentos'], command: () => this.sidebarVisible = false },
                    { label: 'Eventos', icon: 'pi pi-calendar-plus', routerLink: ['/gestao/eventos'], command: () => this.sidebarVisible = false },
                    { label: 'Perfis', icon: 'pi pi-id-card', routerLink: ['/gestao/perfis'], command: () => this.sidebarVisible = false },
                    { label: 'Profissionais', icon: 'pi pi-briefcase', routerLink: ['/gestao/profissionais'], command: () => this.sidebarVisible = false },
                    { label: 'Usuários', icon: 'pi pi-users', routerLink: ['/gestao/usuarios'], command: () => this.sidebarVisible = false }
                ]
            }
        ];
    }

    updateUserName() {
        if (typeof sessionStorage !== 'undefined') {
            const storedName = sessionStorage.getItem('nome');
            if (storedName) {
                this.userName = storedName;
            }
        }
    }

    logout() {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.clear();
        }
        this.router.navigate(['/publico/login']);
    }
}
