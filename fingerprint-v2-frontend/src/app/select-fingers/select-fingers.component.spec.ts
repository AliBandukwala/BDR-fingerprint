import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFingersComponent } from './select-fingers.component';

describe('SelectFingersComponent', () => {
  let component: SelectFingersComponent;
  let fixture: ComponentFixture<SelectFingersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFingersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
