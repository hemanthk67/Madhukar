import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EandwAttandanceComponent } from "./eandw-attandance.component";

describe("EandwAttandanceComponent", () => {
  let component: EandwAttandanceComponent;
  let fixture: ComponentFixture<EandwAttandanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EandwAttandanceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EandwAttandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
