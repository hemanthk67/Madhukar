import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnquiryComponent } from './new-enquiry.component';

describe('NewEnquiryComponent', () => {
  let component: NewEnquiryComponent;
  let fixture: ComponentFixture<NewEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
