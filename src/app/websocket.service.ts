import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal-compatibility";
import {Observable, of, Subject, timer} from "rxjs";
import {catchError, mergeMap, retryWhen} from "rxjs/operators";
import {webSocket} from "rxjs/webSocket";
export const WS_ENDPOINT = 'ws://localhost:8085/AudicaStats';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // The "!" is the "definite assignment assertion operator" to avoid strict property
  // initialization from failing this build.  We purposely want this uninitialized until
  // connect() is called.
  // @see https://www.ryadel.com/en/ts2564-ts-property-has-no-initializer-typescript-error-fix-visual-studio-2017-vs2017/
  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(catchError(e => { throw e; }));

  public connect(): void {
    const genericRetryStrategy = ({
      retryTime = 5000
    }: {
      retryTime?: number
    } = {}) => (attempts: Observable<any>) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          console.log('Failed to connect. Retrying...');
          return timer(retryTime);
        })
      );
    }


    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.socket$.pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(error))
      ).subscribe({
        next: (data) => { this.messagesSubject$.next(data); },
        error: (err) => { console.log(err); },
        complete: () => { console.log('done'); }
      });
    }
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket(WS_ENDPOINT);
  }

  public sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  public close() {
    this.socket$.complete();
  }
}
