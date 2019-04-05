import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditListItemComponent } from './credit-list-item.component';

describe('CreditListItemComponent', () => {
  let component: CreditListItemComponent;
  let fixture: ComponentFixture<CreditListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
