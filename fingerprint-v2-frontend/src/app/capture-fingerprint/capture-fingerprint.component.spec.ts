import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureFingerprintComponent } from './capture-fingerprint.component';

describe('CaptureFingerprintComponent', () => {
  let component: CaptureFingerprintComponent;
  let fixture: ComponentFixture<CaptureFingerprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureFingerprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureFingerprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
