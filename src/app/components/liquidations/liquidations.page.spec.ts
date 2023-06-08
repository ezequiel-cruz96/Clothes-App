import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiquidationsPage } from './liquidations.page';

describe('LiquidationsPage', () => {
  let component: LiquidationsPage;
  let fixture: ComponentFixture<LiquidationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LiquidationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
