import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InternalRightNavBarComponent } from "./internal-right-nav-bar.component";

describe("InternalRightNavBarComponent", () => {
  let component: InternalRightNavBarComponent;
  let fixture: ComponentFixture<InternalRightNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InternalRightNavBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalRightNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
