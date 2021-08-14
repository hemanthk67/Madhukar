import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewPurchaseOrderReceivedComponent } from "./new-purchase-order-received.component";

describe("NewPurchaseOrderReceivedComponent", () => {
  let component: NewPurchaseOrderReceivedComponent;
  let fixture: ComponentFixture<NewPurchaseOrderReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewPurchaseOrderReceivedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPurchaseOrderReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
