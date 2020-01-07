import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
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
  MatMenuModule
} from '@angular/material';

import { ModalService } from '../modal.service';
import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

import { MypageComponent } from './mypage.component';

describe('MypageComponent', () => {
  let component: MypageComponent;
  let fixture: ComponentFixture<MypageComponent>;
  let compiled: any;
  let initData = [{
    id: 1,
    user_id: 1,
    title: 'test',
    url: 'test url',
    imageurl: 'test image url',
    genre: 'test',
    tags: 'test1,test2',
    overview: 'test overview',
    created_at: 'test create date',
    updated_at: 'test update date'
  },
  {
    id: 2,
    user_id: 1,
    title: 'test',
    url: 'test url',
    imageurl: 'test image url',
    genre: 'test',
    tags: 'test2,test3',
    overview: 'test overview',
    created_at: 'test create date',
    updated_at: 'test update date'
  },
  {
    id: 3,
    user_id: 1,
    title: 'test',
    url: 'test url',
    imageurl: 'test image url',
    genre: 'study',
    tags: 'test3,test4',
    overview: 'test overview',
    created_at: 'test create date',
    updated_at: 'test update date'
  }];

  let createData1 = {
    id: 1,
    user_id: 1,
    title: 'create1 test',
    url: 'test url',
    imageurl: 'test image url',
    genre: 'test',
    tags: 'test1,test2,test3',
    overview: 'test overview',
    created_at: 'test create date',
    updated_at: 'test update date'
  }

  let createData2 = {
    id: 2,
    user_id: 1,
    title: 'create2 test',
    url: 'test url',
    imageurl: 'test image url',
    genre: 'test',
    tags: 'test1,test2,test3',
    overview: 'test overview',
    created_at: 'test create date',
    updated_at: 'test update date'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MypageComponent ],
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        RouterTestingModule,
        MatSnackBarModule, 
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [ ModalService, RequestService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    component.username = 'test users';
    component.data = initData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search inputbox', () => {
    expect(compiled.querySelector('.searchinput').textContent).toContain('search tags');
  });
  
  it('should render search dropdown', () => {
    expect(compiled.querySelector('.selection').textContent).toContain('tags selection');
  });

  it('should render login button', () => {
    expect(compiled.querySelector('.logbtn').textContent).toContain('login');
  });

  it('should render add button', () => {
    expect(compiled.querySelector('.fab')).toBeTruthy();
  });

  it('should render material card', () => {
    expect(compiled.querySelector('.childcardcontent').textContent).toContain('test');
  });
// クラスメソッドのテスト↓
  it('should render first create contents card', () => {
    component.dataRegist(createData1);
    component.selectGenre('all');
    fixture.detectChanges();
    expect(compiled.querySelector('#card0').textContent).toContain('create1 test');
  });

  it('should render create multiple contents card', () => {
    component.dataRegist(createData1);
    component.selectGenre('all');
    component.dataRegist(createData2);
    component.selectGenre('all');
    fixture.detectChanges();
    expect(compiled.querySelector('#card0').textContent).toContain('create2 test');
  });

  it('should render edit contents card', () => {
    let editData = {
      id: 1,
      user_id: 1,
      title: 'edit test',
      url: 'test url',
      imageurl: 'test image url',
      genre: 'test',
      tags: 'test1,test2,test3',
      overview: 'test overview',
      created_at: 'test create date',
      updated_at: 'test update date'
    }
    component.dataRegist(createData1);
    component.selectGenre('all');
    component.dataEdit(editData);
    component.selectGenre('all');
    fixture.detectChanges();
    expect(compiled.querySelector('#card0').textContent).toContain('edit test');
  });

  it('should render delete contents card', () => {
    component.dataRegist(createData1);
    component.selectGenre('all');
    component.dataDelete(createData1);
    component.selectGenre('all');
    fixture.detectChanges();
    expect(compiled.querySelector('#card0')).toBeFalsy();
  });

  it('should genre refine contents', () => {
    component.dataRegist(initData[2]);
    component.dataRegist(initData[1]);
    component.dataRegist(initData[0]);
    component.selectGenre('test');
    fixture.detectChanges();
    let genredata = [{
      id: 1,
      user_id: 1,
      title: 'test',
      url: 'test url',
      imageurl: 'test image url',
      genre: 'test',
      tags: 'test1,test2',
      overview: 'test overview',
      created_at: 'test create date',
      updated_at: 'test update date'
    },
    {
      id: 2,
      user_id: 1,
      title: 'test',
      url: 'test url',
      imageurl: 'test image url',
      genre: 'test',
      tags: 'test2,test3',
      overview: 'test overview',
      created_at: 'test create date',
      updated_at: 'test update date'
    }];
    expect(component.data).toEqual(genredata);
  });

  it('should tags refine contents', () => {
    component.dataRegist(initData[2]);
    component.dataRegist(initData[1]);
    component.dataRegist(initData[0]);
    component.selectGenre('all');
    component.selectTags = ['test3'];
    component.selecttags();
    fixture.detectChanges();
    let tagsdata = [{
      id: 2,
      user_id: 1,
      title: 'test',
      url: 'test url',
      imageurl: 'test image url',
      genre: 'test',
      tags: 'test2,test3',
      overview: 'test overview',
      created_at: 'test create date',
      updated_at: 'test update date'
    },{
      id: 3,
      user_id: 1,
      title: 'test',
      url: 'test url',
      imageurl: 'test image url',
      genre: 'study',
      tags: 'test3,test4',
      overview: 'test overview',
      created_at: 'test create date',
      updated_at: 'test update date'
    }];
    expect(component.data).toEqual(tagsdata);
  });

  it('should multiple tags refine contents', () => {
    component.dataRegist(initData[2]);
    component.dataRegist(initData[1]);
    component.dataRegist(initData[0]);
    component.selectGenre('all');
    component.selectTags = ['test3','test4'];
    component.selecttags();
    fixture.detectChanges();
    let tagsdata = [{
      id: 3,
      user_id: 1,
      title: 'test',
      url: 'test url',
      imageurl: 'test image url',
      genre: 'study',
      tags: 'test3,test4',
      overview: 'test overview',
      created_at: 'test create date',
      updated_at: 'test update date'
    }];
    expect(component.data).toEqual(tagsdata);
  });
});
