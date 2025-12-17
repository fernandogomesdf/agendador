import { Injectable, Output, EventEmitter, inject } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { map, share, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppService {

    @Output() blockEmitter = new EventEmitter();

    public messageService =  inject(MessageService)

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.messageService.clear();
            }
        });
    }

    tratarErro(err: any) {
        try {
            if (err.status && err.status == 401) {
                this.router.navigate(['/publico/login']);
            } else {
                if (err.error.type == 'error') {
                    this.msgErro('Não foi possí­vel conectar no servidor.');
                } else {
                    let resposta = err.error
                    if (resposta.message) {
                        if (resposta.status == 500 || err.status == 500) {
                            this.msgErro(resposta.message);
                        } else {
                            this.msgWarn(resposta.message);
                        }
                        if (resposta.exception) {
                            console.log(resposta.exception);
                        }
                    } else {
                        if (resposta.exception) {
                            this.msgErro(resposta.exception);
                        }
                    }
                }
            }
        } catch (erro) {
            console.log(erro);
        }
        this.blockEmitter.emit({
            value: false
        });
    }

    private getToken(): string {
        if (typeof window === 'undefined') { return ''; }
        try { return sessionStorage.getItem('token') || ''; } catch { return ''; }
    }

    private hasBrowser(): boolean { return typeof window !== 'undefined'; }

    requestPost(url: string, data: any): Observable<any> {
        this.blockEmitter.emit({
            value: true
        });
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        console.log('[DEBUG] requestPost:', this.getServerHostPort() + url, data);

        return this.http.post(this.getServerHostPort() + url, data, httpOptions).pipe(
            map(response => {
                console.log('[DEBUG] requestPost resposta:', response);
                this.blockEmitter.emit({ value: false });
                return response;
            }),
            catchError(err => {
                console.error('[DEBUG] requestPost erro:', err);
                this.blockEmitter.emit({ value: false });
                this.tratarErro(err);
                throw err;
            })
        );
    }

    requestGetNaoBloqueante(url: string): Observable<any> {
        return this.requestGetPrivado(url, false, false);
    }

    requestGetExterno(url: string): Observable<any> {
        return this.requestGetPrivado(url, true, true);
    }

    requestGet(url: string): Observable<any> {
        return this.requestGetPrivado(url, true, false);
    }

    private requestGetPrivado(url: string, bloqueante: boolean, externo: boolean): Observable<any> {
        this.blockEmitter.emit({
            value: bloqueante
        });

    let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        let response$ = this.http.get((externo ? "" : this.getServerHostPort()) + url, httpOptions).pipe(
            map(response => {
                try {
                    return response;
                } catch (error) {
                    return (response as any)._body; 
                }
            }),
            share()
        );
        response$.subscribe({
            next: (result) => {
                this.blockEmitter.emit({
                    value: false
                });
            },
            error: (err) => {
                this.tratarErro(err);
            }
        });
        return response$;
    }

    getServerHostPort() {
        if (!this.hasBrowser()) {
            // Fallback padrão durante SSR
            return 'http://localhost:8081/agendador';
        }
        try {
            let serverHostPort = window.location.protocol + "//localhost:8081/agendador";
            if (window.location.port !== '4200') {
                serverHostPort = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/agendador";
            }
            return serverHostPort;
        } catch {
            return 'http://localhost:8081/agendador';
        }
    }

    private msg(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity: severity, summary: summary, detail: detail });
    }

    msgInfo(detail: string) {
        this.msg('info', 'Informação', detail);
    }

    msgWarn(detail: string) {
        this.msg('warn', 'Alerta', detail);
    }

    msgErro(detail: string) {
        this.msg('error', 'Erro', detail);
    }

    msgSucesso(detail: string) {
        this.msg('success', 'Sucesso', detail);
    }
}