import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPurchaseComponent } from './land-purchase.component';

describe('LandPurchaseComponent', () => {
  let component: LandPurchaseComponent;
  let fixture: ComponentFixture<LandPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
