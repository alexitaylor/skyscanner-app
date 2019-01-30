import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyscannerSearchPlaceComponent } from './skyscanner-search-place.component';

describe('SkyscannerSearchPlaceComponent', () => {
  let component: SkyscannerSearchPlaceComponent;
  let fixture: ComponentFixture<SkyscannerSearchPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkyscannerSearchPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyscannerSearchPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
