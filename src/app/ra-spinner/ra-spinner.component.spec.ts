import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaSpinnerComponent } from './ra-spinner.component';

describe('RaSpinnerComponent', () => {
  let component: RaSpinnerComponent;
  let fixture: ComponentFixture<RaSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
