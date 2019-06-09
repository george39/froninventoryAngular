import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouse1Component } from './add-warehouse1.component';

describe('AddWarehouse1Component', () => {
  let component: AddWarehouse1Component;
  let fixture: ComponentFixture<AddWarehouse1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWarehouse1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWarehouse1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
