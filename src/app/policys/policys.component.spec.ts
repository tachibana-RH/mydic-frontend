import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

import { PolicysComponent } from './policys.component';

describe('PolicysComponent', () => {
  let component: PolicysComponent;
  let fixture: ComponentFixture<PolicysComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule ],
      declarations: [ PolicysComponent ],
      providers: [ RequestService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicysComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render terms', () => {
    expect(compiled.querySelector('.terms')).toBeDefined();
  });

  it('should render privacy', () => {
    expect(compiled.querySelector('.privacy')).toBeDefined();
  });

  it('should render contact', () => {
    expect(compiled.querySelector('.contact')).toBeDefined();
  });

  it('should render contact formGroup', () => {
    expect(compiled.querySelector('.contactForm')).toBeDefined();
  });

  it('should render contact forms', () => {
    expect(compiled.querySelector('.form-field')).toBeDefined();
    expect(compiled.querySelector('.submitbtn')).toBeDefined();
  });
});
