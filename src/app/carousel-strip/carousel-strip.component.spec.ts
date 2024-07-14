import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselStripComponent } from './carousel-strip.component';

describe('CarouselStripComponent', () => {
  let component: CarouselStripComponent;
  let fixture: ComponentFixture<CarouselStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselStripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
