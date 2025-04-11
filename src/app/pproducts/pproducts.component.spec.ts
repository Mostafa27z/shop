import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PproductsComponent } from './pproducts.component';

describe('PproductsComponent', () => {
  let component: PproductsComponent;
  let fixture: ComponentFixture<PproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
