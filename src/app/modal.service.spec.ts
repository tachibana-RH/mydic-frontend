import { ModalService } from './modal.service';
import { ModalEntryComponent } from './mypage/modal.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subscription } from 'rxjs';
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

import { RequestService } from './request.service';
import { CookieService } from 'ngx-cookie-service';

import {
  NgModule,
  Component
} from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ModalTestComponent],
  entryComponents: [ModalTestComponent]
})
/**
 * モーダル画面のテストで埋め込むためのテンプレート
 */
@Component({
  selector: 'app-modal-test',
  styles: [`
  .overlay {
    width: 100%;
    height: 100%;
  }
  .title {
    background-color: blueviolet;
    border-radius: 5px 5px 0px 0px / 5px 5px 0px 0px;
    color: white;
    padding:5px
  }
`],
  template: `
  <div class="overlay">
    <div class="title">Test</div>
  </div>
`
})
export class ModalTestComponent {
  
}
interface itemProps {
  id: number;
  user_id: number;
  title: string;
  url: string;
  imageurl: string;
  genre: string;
  tags: string;
  overview: string;
  created_at: string;
  updated_at: string;
}

describe('ModalService', () => {
  let component: ModalEntryComponent;
  let fixture: ComponentFixture<ModalEntryComponent>;
  let subscription: Subscription;
  let service: ModalService;
  let testdate:itemProps = {
    id: 0,
    user_id: 0,
    title: 'test',
    url: 'test',
    imageurl: 'test',
    genre: 'test',
    tags: 'test',
    overview: 'test',
    created_at: 'test',
    updated_at: 'test'
  };

  beforeEach(async(() => TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ ModalEntryComponent ],
    imports: [ 
      FormsModule, 
      ReactiveFormsModule, 
      HttpClientTestingModule, 
      MatSnackBarModule, 
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      BrowserModule,
      BrowserAnimationsModule,
      ModalTestComponent
    ],
    providers: [ ModalService, RequestService, CookieService ]
  }).compileComponents()
  ));

  beforeEach(()=>{
    fixture = TestBed.createComponent(ModalEntryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ModalService);
    fixture.detectChanges();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be modal created', () => {
    subscription = service.content$.subscribe(res=>{
      expect(res).toBeTruthy();
    });
    service.open(ModalTestComponent,'login');
  });

  it('should be modal delete', () => {
    service.open(ModalTestComponent,'login');

    subscription = service.content$.subscribe(res=>{
      expect(res).toBeFalsy();
    });
    service.close();
  });

  it('should be regist contents', () => {
    subscription = service.regist$.subscribe(res=>{
      expect(res).toBe(testdate);
    });
    service.registContents(testdate);
  });

  it('should be edit contents', () => {
    subscription = service.edit$.subscribe(res=>{
      expect(res).toBe(testdate);
    });
    service.editContents(testdate);
  });

  it('should be delete contents', () => {
    subscription = service.delete$.subscribe(res=>{
      expect(res).toBe(testdate);
    });
    service.deleteContents(testdate);
  });
});
