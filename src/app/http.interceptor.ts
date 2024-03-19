import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ConfirmationDialogsService } from './services/dialog/confirmation.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterceptedHttp implements HttpInterceptor {
  timerRef: any;
  currentLanguageSet: any;
  private dologout: any = null;
  constructor(
    // private spinnerService: SpinnerService,
    private router: Router,
    private confirmationService: ConfirmationDialogsService,
    private http: HttpClient,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const key: any = sessionStorage.getItem('key');
    let modifiedReq = null;
    if (key !== undefined && key !== null) {
      modifiedReq = req.clone({
        headers: req.headers
          .set('Authorization', key)
          .set('Content-Type', 'application/json'),
      });
    } else {
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', ''),
      });
    }
    return next.handle(modifiedReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (req.url !== undefined && !req.url.includes('cti/getAgentState'))
          if (event instanceof HttpResponse) {
            //   this.spinnerService.setLoading(true);
            console.log(event.body);
            this.onSuccess(req.url, event.body);
            //   this.spinnerService.setLoading(false);
            return event.body;
          }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        // this.spinnerService.setLoading(false);
        return throwError(error.error);
      }),
    );
  }

  private onSuccess(url: string, response: any): void {
    if (this.timerRef) clearTimeout(this.timerRef);

    if (
      response.statusCode === 5002 &&
      url.indexOf('user/userAuthenticate') < 0
    ) {
      sessionStorage.clear();
      localStorage.clear();
      setTimeout(() => this.router.navigate(['/login']), 0);
      this.confirmationService.alert(response.errorMessage, 'error');
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.timerRef = setTimeout(
      () => {
        console.log('there', Date());

        if (
          sessionStorage.getItem('authenticationToken') &&
          sessionStorage.getItem('isAuthenticated')
        ) {
          this.confirmationService
            .alert(
              'Your session is about to Expire. Do you need more time ? ',
              'sessionTimeOut',
            )
            .afterClosed()
            .subscribe((result: any) => {
              //   if (result.action == 'continue') {
              //     this.http.post(environment.extendSessionUrl, {}).subscribe(
              //       (res: any) => {},
              //       (err: any) => {}
              //     );
              //   }
              if (result.action === 'timeout') {
                clearTimeout(this.timerRef);
                sessionStorage.clear();
                localStorage.clear();
                this.confirmationService.alert(
                  this.currentLanguageSet.sessionExpired,
                  'error',
                );
                this.router.navigate(['/login']);
              } else if (result.action === 'cancel') {
                setTimeout(() => {
                  clearTimeout(this.timerRef);
                  sessionStorage.clear();
                  localStorage.clear();
                  this.confirmationService.alert(
                    this.currentLanguageSet.sessionExpired,
                    'error',
                  );
                  this.router.navigate(['/login']);
                }, result.remainingTime * 1000);
              }
            });
        }
      },
      27 * 60 * 1000,
    );
  }
  // dologout: any;
  logoutUserFromPreviousSession = new BehaviorSubject(this.dologout);
  logoutUserFromPreviousSessions$ =
    this.logoutUserFromPreviousSession.asObservable();
  dologoutUsrFromPreSession(dologout: any) {
    this.dologout = dologout;
    this.logoutUserFromPreviousSession.next(dologout);
  }
  // private logoutUserFromPreviousSession = new BehaviorSubject(this.dologout);
  // // Expose an observable for components to subscribe to
  // logoutUserFromPreviousSessions$ = this.logoutUserFromPreviousSession.asObservable();

  // // Method to update the logout state
  // dologoutUsrFromPreSession(dologout: any) {
  // this.dologout = dologout;
  // this.logoutUserFromPreviousSession.next(dologout);
  // }
}
