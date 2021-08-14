import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrepareOfferComponent } from "./prepare-offer.component";

describe("PrepareOfferComponent", () => {
  let component: PrepareOfferComponent;
  let fixture: ComponentFixture<PrepareOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrepareOfferComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
