import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeAuthenticationComponent } from './se-authentication.component';

describe('SeAuthenticationComponent', () => {
  let component: SeAuthenticationComponent;
  let fixture: ComponentFixture<SeAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeAuthenticationComponent]
    });
    fixture = TestBed.createComponent(SeAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
