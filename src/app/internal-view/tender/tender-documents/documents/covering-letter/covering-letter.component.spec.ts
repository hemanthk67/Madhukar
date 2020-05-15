import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveringLetterComponent } from './covering-letter.component';

describe('CoveringLetterComponent', () => {
  let component: CoveringLetterComponent;
  let fixture: ComponentFixture<CoveringLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoveringLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoveringLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
