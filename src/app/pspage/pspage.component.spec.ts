import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PspageComponent } from './pspage.component';

describe('PspageComponent', () => {
  let component: PspageComponent;
  let fixture: ComponentFixture<PspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
