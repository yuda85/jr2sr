import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('https://our-host.com')) { // todo
      return from(this.setToken(request)).pipe(
        switchMap(authReq => next.handle(authReq))
      );
    }
    return next.handle(request);
  }

  /**
   * Get the user's token and add it to the request authorization header (if there is a logged-in user)
   * @param request
   * @private
   */
  private async setToken(request: HttpRequest<unknown>): Promise<HttpRequest<unknown>> {
    const token = await this.authService.userData?.getIdToken();
    return token
      ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      : request;
  }

}
