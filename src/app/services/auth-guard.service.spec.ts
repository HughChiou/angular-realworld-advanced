import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthGuardService, useValue: routerSpy }]
    });
  });

  it('should be created', inject(
    [AuthGuardService],
    (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('hasLogin should be false', inject(
    [AuthGuardService],
    (service: AuthGuardService) => {
      expect(service.hasLogin).toBeFalsy();
    }
  ));
});
