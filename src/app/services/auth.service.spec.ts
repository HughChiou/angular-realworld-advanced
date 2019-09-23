import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should login successfully', inject(
    [AuthService],
    (service: AuthService) => {
      service.login(`aaa@email.com`, `password`).subscribe(res => {
        expect(res).toBeTruthy();
      });

      const req = httpTestingController.expectOne(
        'https://conduit.productionready.io/api/users/login'
      );

      expect(req.request.method).toEqual('POST');

      req.flush(
        { user: { token: `test` } },
        { status: 200, statusText: `login successfully` }
      );

      httpTestingController.verify();
    }
  ));

  it('should login fail', inject([AuthService], (service: AuthService) => {
    service.login(`aaa@email.com`, `password`).subscribe(res => {
      expect(res).toBeFalsy();
    });

    const req = httpTestingController.expectOne(
      'https://conduit.productionready.io/api/users/login'
    );

    expect(req.request.method).toEqual('POST');

    req.flush(
      { user: { token: `test` } },
      { status: 400, statusText: `login fail` }
    );

    httpTestingController.verify();
  }));
});
