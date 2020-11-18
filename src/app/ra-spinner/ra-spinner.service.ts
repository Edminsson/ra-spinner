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

  show(name: string = PRIMARY_SPINNER, spinner?: Spinner) {
    setTimeout(() => {
      const showPromise = new Promise((resolve, _reject) => {
        if (spinner && Object.keys(spinner).length) {
          spinner['name'] = name;
          this.spinnerObservable.next(new RaSpinner({ ...spinner, show: true }));
          resolve(true);
        } else {
          this.spinnerObservable.next(new RaSpinner({ name, show: true }));
          resolve(true);
        }
      });
      return showPromise;
    }, 10);
  }

  hide(name: string = PRIMARY_SPINNER, debounce: number = 10) {
    setTimeout(() => {
      const hidePromise = new Promise((resolve, _reject) => {
        this.spinnerObservable.next(new RaSpinner({ name, show: false }));
        resolve(true);
      });
      return hidePromise;
    }, debounce);
  }
}
