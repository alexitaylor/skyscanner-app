import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyscannerDateInputComponent } from './skyscanner-date-input.component';

describe('SkyscannerDateInputComponent', () => {
  let component: SkyscannerDateInputComponent;
  let fixture: ComponentFixture<SkyscannerDateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkyscannerDateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyscannerDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
