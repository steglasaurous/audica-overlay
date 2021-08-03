import { TestBed } from '@angular/core/testing';

import { AudicaWebsocketService } from './audica-websocket.service';

describe('AudicaWebsocketService', () => {
  let service: AudicaWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudicaWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
