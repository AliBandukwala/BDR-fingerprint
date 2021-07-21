import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectHdcsComponent } from './connect-hdcs.component';

describe('ConnectHdcsComponent', () => {
  let component: ConnectHdcsComponent;
  let fixture: ComponentFixture<ConnectHdcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectHdcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectHdcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
