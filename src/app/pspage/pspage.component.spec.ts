import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

import { PspageComponent } from './pspage.component';

describe('PspageComponent', () => {
  let component: PspageComponent;
  let fixture: ComponentFixture<PspageComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ PspageComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [ RequestService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PspageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    component.token = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render material card', () => {
    expect(compiled.querySelector('.parentcard')).toBeDefined();
  });

  it('should render material forms', () => {
    expect(compiled.querySelector('.form-field')).toBeDefined();
  });

  it('should render material button', () => {
    expect(compiled.querySelector('.submitbtn')).toBeDefined();
  });

  it('should render result msg', () => {
    expect(compiled.querySelector('#resultmsg')).toBeDefined();
  });
});
