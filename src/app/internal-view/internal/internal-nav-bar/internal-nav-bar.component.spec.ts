import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InternalNavBarComponent } from "./internal-nav-bar.component";

describe("InternalNavBarComponent", () => {
  let component: InternalNavBarComponent;
  let fixture: ComponentFixture<InternalNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InternalNavBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
