import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTenderComponent } from './complete-tender.component';

describe('CompleteTenderComponent', () => {
  let component: CompleteTenderComponent;
  let fixture: ComponentFixture<CompleteTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
