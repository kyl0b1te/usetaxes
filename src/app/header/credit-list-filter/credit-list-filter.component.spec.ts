import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditListFilterComponent } from './credit-list-filter.component';

describe('CreditListFilterComponent', () => {
  let component: CreditListFilterComponent;
  let fixture: ComponentFixture<CreditListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
