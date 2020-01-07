import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatButtonToggleModule, 
  MatDialogModule
} from '@angular/material';

import { SendItemService } from '../send-item.service';
import { ModalService } from '../modal.service';
import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

import { DicdetailComponent } from './dicdetail.component';


describe('DicdetailComponent', () => {
  let component: DicdetailComponent;
  let fixture: ComponentFixture<DicdetailComponent>;
  let compiled: any;
  let sendItemServiceStub: Partial<SendItemService>;

  beforeEach(async(() => {
    sendItemServiceStub = {
      item: {
        id: 0,
        user_id: 0,
        title: '',
        url: 'http://test',
        imageurl: 'http://testimage',
        genre: 'test',
        tags: 'test1,test2,test3',
        overview: 'test overview',
        created_at: '',
        updated_at: ''
      },
      contentsIndex: 0
    };
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ DicdetailComponent ],
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        RouterTestingModule,
        MatSnackBarModule, 
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [ {provide: SendItemService, useValue: sendItemServiceStub }, ModalService, RequestService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicdetailComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    const sendItemS = TestBed.get(SendItemService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cancel icon', () => {
    expect(compiled.querySelector('.cancelIcon')).toBeDefined();
  });

  it('should render property', () => {
    expect(compiled.querySelector('.property')).toBeDefined();
    expect(compiled.querySelector('.genre')).toBeDefined();
  });

  it('should render container', () => {
    expect(compiled.querySelector('.container')).toBeDefined();
  });

  it('should render siteinfo', () => {
    expect(compiled.querySelector('.siteinfo')).toBeDefined();
  });

  it('should render contents', () => {
    expect(compiled.querySelector('.contents')).toBeDefined();
  });

  it('should render overview', () => {
    expect(compiled.querySelector('.overview')).toBeDefined();
    expect(compiled.querySelector('.overview-inner')).toBeDefined();
  });

  it('should render taggroup', () => {
    expect(compiled.querySelector('.taggroup')).toBeDefined();
    expect(compiled.querySelector('.tags')).toBeDefined();
  });
  
  it('should render btns', () => {
    expect(compiled.querySelector('.btn')).toBeDefined();
    expect(compiled.querySelector('.edit')).toBeDefined();
    expect(compiled.querySelector('.movesite')).toBeDefined();
    expect(compiled.querySelector('.delete')).toBeDefined();
  });
});
