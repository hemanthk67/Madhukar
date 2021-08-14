import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TenderResultComponent } from "./tender-result.component";

describe("TenderResultComponent", () => {
  let component: TenderResultComponent;
  let fixture: ComponentFixture<TenderResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenderResultComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
