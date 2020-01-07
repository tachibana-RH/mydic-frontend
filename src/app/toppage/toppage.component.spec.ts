import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppageComponent } from './toppage.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatCardModule,
  MatButtonModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

describe('ToppageComponent', () => {
  let component: ToppageComponent;
  let fixture: ComponentFixture<ToppageComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ToppageComponent ],
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule, 
        // BrowserModule, 
        // BrowserAnimationsModule, 
        // MatTabsModule, 
        // MatCardModule, 
        // MatButtonModule 
      ],
      providers: [ RequestService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the toppage', () => {
    expect(component).toBeTruthy();
  });

  it('should render toppage in a h1 tag', () => {
    expect(compiled.querySelector('h1').textContent).toContain('Webサイト管理アプリ');
  });

  it('should render toppage in a tab1', () => {
    expect(compiled.querySelector('#tab1').textContent).toContain('ウェブサイトにメモをつけて管理できるサービスです。');
  });

  it('should render toppage in a tab2', () => {
    expect(compiled.querySelector('#tab2').textContent).toContain('ウェブサイトに関するメモや検索タグなどを付けて保存できます。');
  });

  it('should render toppage in a tab3', () => {
    expect(compiled.querySelector('#tab3').textContent).toContain('保存時に指定したジャンルで絞り込みを行えます。');
  });

  it('should render toppage in a tab4', () => {
    expect(compiled.querySelector('#tab4').textContent).toContain('登録したタグをドロップダウンで選択して検索できます。');
  });

  it('should render toppage in a guestUserCreateButton', () => {
    expect(compiled.querySelector('#guestUserCreateButton').textContent).toContain('Use for trial');
  });
});
