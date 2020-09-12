import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPermissionsComponent } from './login-permissions.component';

describe('LoginPermissionsComponent', () => {
  let component: LoginPermissionsComponent;
  let fixture: ComponentFixture<LoginPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
