import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal-compatibility";
import {EMPTY, Observable, Subject} from "rxjs";
import {catchError, multicast, switchAll, tap} from "rxjs/operators";
import {webSocket} from "rxjs/webSocket";
import {environment} from "../environments/environment";
export const WS_ENDPOINT = environment.wsEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AudicaWebsocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$: Observable<any> = this.messagesSubject$.pipe();

  constructor() {
    this.socket$ = webSocket(WS_ENDPOINT);
    this.connect();
  }

  public connect(): void {
    const messages = this.socket$.pipe(
      tap({
        next: (v) => console.log(v),
        error: error => console.log(error),
      }),
      catchError(_ => EMPTY)
    );

    this.messagesSubject$.next(messages);
    console.log('Connect() done');
  }

  public close(): void {
    this.socket$.complete();
  }

  private getNewWebsocket(): WebSocketSubject<any> {
    return webSocket(WS_ENDPOINT);
  }
}
