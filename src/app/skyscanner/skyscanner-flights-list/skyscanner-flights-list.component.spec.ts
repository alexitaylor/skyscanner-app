import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyscannerFlightsListComponent } from './skyscanner-flights-list.component';

describe('SkyscannerFlightsListComponent', () => {
  let component: SkyscannerFlightsListComponent;
  let fixture: ComponentFixture<SkyscannerFlightsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkyscannerFlightsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyscannerFlightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
