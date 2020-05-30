import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderQueryComponent } from './tender-query.component';

describe('TenderQueryComponent', () => {
  let component: TenderQueryComponent;
  let fixture: ComponentFixture<TenderQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
