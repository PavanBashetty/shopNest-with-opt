import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsAuthenticationComponent } from './us-authentication.component';

describe('UsAuthenticationComponent', () => {
  let component: UsAuthenticationComponent;
  let fixture: ComponentFixture<UsAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsAuthenticationComponent]
    });
    fixture = TestBed.createComponent(UsAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
