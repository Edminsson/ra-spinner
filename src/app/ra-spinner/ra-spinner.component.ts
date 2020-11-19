import {
  Component,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  SimpleChange,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { RaSpinnerService } from './ra-spinner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULTS, Size, RaSpinner, PRIMARY_SPINNER } from './ra-spinner.enum';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-ra-spinner',
  templateUrl: 'ra-spinner.component.html',
  styleUrls: ['ra-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave',
        animate(200, style({ opacity: 0 })))
    ])
  ]
})
export class RaSpinnerComponent implements OnDestroy, OnInit, OnChanges {
  @Input() bdColor: string;
  @Input() size: Size;
  @Input() color: string;
  @Input() type: string;
  @Input() fullScreen: boolean;
  @Input() name: string;
  @Input() zIndex: number;
  spinner: RaSpinner = new RaSpinner();
  divArray: Array<number>;
  divCount: number;
  show: boolean;
  ngUnsubscribe: Subject<void> = new Subject();

  constructor(private spinnerService: RaSpinnerService, private changeDetector: ChangeDetectorRef) {
    this.bdColor = DEFAULTS.BD_COLOR;
    this.zIndex = DEFAULTS.Z_INDEX;
    this.color = DEFAULTS.SPINNER_COLOR;
    this.type = DEFAULTS.SPINNER_TYPE;
    this.size = 'large';
    this.fullScreen = true;
    this.name = PRIMARY_SPINNER;

    this.divArray = [];
    this.divCount = 0;
    this.show = false;
  }

  ngOnInit(): void {
    this.spinner = this.getDefaultOptions();
    this.spinnerService.getSpinner(this.name)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((spinner: RaSpinner) => {
        this.spinner = {...this.getDefaultOptions(), ...spinner};
        if (spinner.show) {
          this.onInputChange();
        }
        this.changeDetector.markForCheck();
      });
  }

  getDefaultOptions = () => {
    const newSpinner = new RaSpinner();
    const defaultSpinner = {
      name: this.name,
      bdColor: this.bdColor,
      size: this.size,
      color: this.color,
      type: this.type,
      fullScreen: this.fullScreen,
      divArray: this.divArray,
      divCount: this.divCount,
      show: this.show,
      zIndex: this.zIndex,
    };
    return { ...newSpinner, ...defaultSpinner };
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (const propName in changes) {
      if (propName) {
        const changedProp = changes[propName];
        if (changedProp.isFirstChange()) {
          return;
        } else if (typeof changedProp.currentValue !== 'undefined' && changedProp.currentValue !== changedProp.previousValue) {
          if (changedProp.currentValue !== '') {
            this.spinner[propName] = changedProp.currentValue;
          }
        }
      }
    }
  }

  getClass(type: string, size: Size): string {
    let sizeClass = '';
    switch (size.toLowerCase()) {
      case 'small':
        sizeClass = 'la-sm';
        break;
      case 'medium':
        sizeClass = 'la-2x';
        break;
      case 'large':
        sizeClass = 'la-3x';
        break;
      default:
        break;
    }
    return 'la-' + type + ' ' + sizeClass;
  }

  onInputChange(): void {
    this.spinner.divCount = DEFAULTS.DIV_COUNTS;
    this.spinner.divArray = Array(this.spinner.divCount).fill(0).map((x, i) => i);
    this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
