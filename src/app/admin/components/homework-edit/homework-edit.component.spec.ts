import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkEditComponent } from './homework-edit.component';

describe('HomeworkEditComponent', () => {
  let component: HomeworkEditComponent;
  let fixture: ComponentFixture<HomeworkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
