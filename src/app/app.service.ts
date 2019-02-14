import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Jsonp } from '@angular/http';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

    @Output() blockEmitter = new EventEmitter();

    constructor(private http: Http, private router: Router, private messageService: MessageService) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.messageService.clear();
            }
        });
    }

    tratarErro(err) {
        try {
            if (err.status && err.status == 401) {
                this.router.navigate(['/login']);
            } else {
                let resposta = err._body;
                if (resposta.type == 'error') {
                    this.msgErro('Não foi possí­vel conectar no servidor.');
                } else {
                    resposta = eval("(" + err._body + ")");
                    if (resposta.message) {
                        if (resposta.status == 500) {
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

    requestPost(url: string, data: any): Observable<any> {
        this.blockEmitter.emit({
            value: true
        });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let token = sessionStorage.getItem('token');
        if (token) {
            headers.append('Authorization', 'Bearer ' + token);
        }
        let options = new RequestOptions({ headers: headers, method: "post" });
        let response$ = this.http.post(this.getServerHostPort() + url, data, options).pipe(
            map(response => {
                try {
                    return response.json();
                }
                catch (error) { return response["_body"]; }
            }),
            share()
        );
        response$.subscribe(result => {
            this.blockEmitter.emit({
                value: false
            });
        }, err => {
            this.tratarErro(err);
        })
        return response$;
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
        let headers = new Headers();
        let token = sessionStorage.getItem('token');
        if (token) {
            headers.append('Authorization', 'Bearer ' + token);
        }
        let options = new RequestOptions({ headers: headers, params: null });
        let response$ = this.http.get((externo ? "" : this.getServerHostPort()) + url, options).pipe(
            map(response => {
                try {
                    return response.json();
                } catch (error) {
                    return response["_body"];
                }
            }),
            share()
        );
        response$.subscribe(result => {
            this.blockEmitter.emit({
                value: false
            });
        }, err => {
            this.tratarErro(err);
        })
        return response$;
    }

    getServerHostPort() {
        let serverHostPort = location.protocol + "//localhost:8080/agendador";
        if ('4200' != location.port) { // local
            serverHostPort = location.protocol + "//" + location.hostname + ":" + location.port + "/agendador";
        }
        return serverHostPort;
    }

    private msg(severity, summary, detail) {
        this.messageService.clear();
        this.messageService.add({ severity: severity, summary: summary, detail: detail });
    }

    msgInfo(detail) {
        this.msg('info', 'Informação', detail);
    }

    msgWarn(detail) {
        this.msg('warn', 'Alerta', detail);
    }

    msgErro(detail) {
        this.msg('error', 'Erro', detail);
    }

    msgSucesso(detail) {
        this.msg('success', 'Sucesso', detail);
    }

}