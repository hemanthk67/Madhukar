import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportsComponent } from './test-reports.component';

describe('TestReportsComponent', () => {
  let component: TestReportsComponent;
  let fixture: ComponentFixture<TestReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
