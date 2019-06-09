import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Injection2Component } from './injection2.component';

describe('Injection2Component', () => {
  let component: Injection2Component;
  let fixture: ComponentFixture<Injection2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Injection2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Injection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
