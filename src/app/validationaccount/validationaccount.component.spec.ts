import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationaccountComponent } from './validationaccount.component';

describe('ValidationaccountComponent', () => {
  let component: ValidationaccountComponent;
  let fixture: ComponentFixture<ValidationaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
