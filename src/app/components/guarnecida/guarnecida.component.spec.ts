import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarnecidaComponent } from './guarnecida.component';

describe('GuarnecidaComponent', () => {
  let component: GuarnecidaComponent;
  let fixture: ComponentFixture<GuarnecidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarnecidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarnecidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
