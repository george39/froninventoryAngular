import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Injection1Component } from './injection1.component';

describe('Injection1Component', () => {
  let component: Injection1Component;
  let fixture: ComponentFixture<Injection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Injection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Injection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
