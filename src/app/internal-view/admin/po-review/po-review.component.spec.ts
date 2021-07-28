import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoReviewComponent } from './po-review.component';

describe('PoReviewComponent', () => {
  let component: PoReviewComponent;
  let fixture: ComponentFixture<PoReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
