import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureLandingComponent } from './secure-landing.component';

describe('SecureLandingComponent', () => {
  let component: SecureLandingComponent;
  let fixture: ComponentFixture<SecureLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
