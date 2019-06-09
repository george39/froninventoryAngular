import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWarehouse1Component } from './list-warehouse1.component';

describe('ListWarehouse1Component', () => {
  let component: ListWarehouse1Component;
  let fixture: ComponentFixture<ListWarehouse1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWarehouse1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWarehouse1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
