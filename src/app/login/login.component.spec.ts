import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

import { ModalService } from '../modal.service';
import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ LoginComponent ],
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        MatSnackBarModule, 
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [ ModalService, RequestService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Oauth button', () => {
    expect(compiled.querySelector('.socialauths')).toBeDefined();
  });

  it('should render basic auth form', () => {
    expect(compiled.querySelector('.basicauth')).toBeDefined();
    expect(compiled.querySelector('.submitbtn')).toBeDefined();
  });

  it('should render new user regist form', () => {
    expect(compiled.querySelector('.registforms')).toBeDefined();
    expect(compiled.querySelector('.registforms > .submitbtn')).toBeDefined();
  });

  it('should render new user regist form', () => {
    expect(compiled.querySelector('.registforms')).toBeDefined();
    expect(compiled.querySelector('.registforms > .submitbtn')).toBeDefined();
  });
});
