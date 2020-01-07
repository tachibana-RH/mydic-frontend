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
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

import { ModalService } from '../modal.service';
import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

import { CreateEditComponent } from './create-edit.component';

describe('CreateEditComponent', () => {
  let component: CreateEditComponent;
  let fixture: ComponentFixture<CreateEditComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ CreateEditComponent ],
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        MatSnackBarModule, 
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [ ModalService, RequestService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render formGroups', () => {
    expect(compiled.querySelector('.contentsForm')).toBeDefined();
  });

  it('should render forms', () => {
    expect(compiled.querySelector('.form-field')).toBeDefined();
  });

  it('should render forms button', () => {
    expect(compiled.querySelector('.btn')).toBeDefined();
    expect(compiled.querySelector('.btn.cancel')).toBeDefined();
  });
});
