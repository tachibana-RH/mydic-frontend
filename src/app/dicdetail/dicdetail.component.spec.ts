import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicdetailComponent } from './dicdetail.component';

describe('DicdetailComponent', () => {
  let component: DicdetailComponent;
  let fixture: ComponentFixture<DicdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
