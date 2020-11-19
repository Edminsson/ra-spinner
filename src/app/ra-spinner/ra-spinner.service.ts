import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RaSpinner, PRIMARY_SPINNER, Spinner } from './ra-spinner.enum';

@Injectable({
  providedIn: 'root'
})
export class RaSpinnerService {
  private spinnerObservable = new BehaviorSubject<RaSpinner>(null);

  constructor() { }

  getSpinner(name: string): Observable<RaSpinner> {
    return this.spinnerObservable.asObservable().pipe(filter((x: RaSpinner) => x && x.name === name));
  }

  show(name: string = PRIMARY_SPINNER, spinner?: Spinner): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.spinnerObservable.next(new RaSpinner({ name, show: true }));
        resolve(true);
      }, 10);
    });
  }

  hide(name: string = PRIMARY_SPINNER, debounce: number = 10): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.spinnerObservable.next(new RaSpinner({ name, show: false }));
        resolve(true);
      }, debounce);
    });
  }
}
