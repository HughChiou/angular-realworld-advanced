import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email, password): Observable<string> {
    const body = {
      user: {
        email: email,
        password: password
      }
    };

    return this.httpClient
      .post('https://conduit.productionready.io/api/users/login', body)
      .pipe(
        catchError(err => {
          return of({
            user: {}
          });
        }),
        map(response => (response as any).user.token)
      );
  }
}
