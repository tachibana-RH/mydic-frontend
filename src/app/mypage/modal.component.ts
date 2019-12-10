import {
  ViewContainerRef,
  Component,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { ModalService } from '../modal.service';
import { Subscription } from 'rxjs';

  /**
   * モーダル画面のテンプレート
   */
@Component({
  selector: 'app-modal-entry',
  styles: [`
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
  }
  .title {
    background-color: blueviolet;
    border-radius: 5px 5px 0px 0px / 5px 5px 0px 0px;
    color: white;
    padding:5px
  }
  .detail-container {
    width: 60%;
    height: 500px;
    margin: auto;
    position: fixed;
    color: #000;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    border-radius: 5px;
  }
  .create_edit-container {
    width: 50%;
    height: 400px;
    margin: auto;
    position: fixed;
    color: #000;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    border-radius: 5px;
  }
  .login-container {
    width: 40%;
    height: 500px;
    margin: auto;
    position: fixed;
    color: #000;
    background-color: #fff;
    top: 0%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    border-radius: 5px;
  }
  @media screen and (max-width:710px){
    .detail-container {
      width: 90%;
    }
    .create_edit-container {
      width: 95%;
    }
    .login-container {
      width: 85%;
    }
  }
`],
  template: `
  <div class="overlay" (click)="close()" [style.display]="display">
      <div [ngClass]="nowClass" (click)="containerClick($event)">
        <div class="title">{{ title }}</div>
        <div #inner></div>
      </div>
  </div>
`
})

  /**
   * モーダルの内容を設定するコンポーネントクラス
   */
export class ModalEntryComponent implements OnInit,AfterViewInit {
  @ViewChild('inner', {read: ViewContainerRef,static:false}) vcr:any;
  private subscription: Subscription;
  public display = 'none';
  public nowClass:any;
  public title:string;

  constructor(
    public modal: ModalService
  ) { }

  ngOnInit() {
    //　モーダルのCSSをコンテンツタイプごとに設定する
    this.subscription = this.modal.content$
    .subscribe(value => {
      switch(this.modal.contentType) {
        case 'detail':
          this.title = `contents ${this.modal.contentType}`;
          this.nowClass = {'detail-container':true,'create_edit-container':false,'login-container':false};
          break;
        case 'create':
          this.title = `contents ${this.modal.contentType}`;
          this.nowClass = {'detail-container':false,'create_edit-container':true,'login-container':false};
          break;
        case 'edit':
          this.title = `contents ${this.modal.contentType}`;
          this.nowClass = {'detail-container':false,'create_edit-container':true,'login-container':false};
          break;
        case 'login':
          this.title = this.modal.contentType;
          this.nowClass = {'detail-container':false,'create_edit-container':false,'login-container':true};
          break;
      }
      if (value) {
        this.display = '';
      } else {
        this.display = 'none';
      }
    });
  }
  ngAfterViewInit() {
    this.modal.vcr = this.vcr;
  }
  containerClick($event:any) {
    $event.stopPropagation();
  }
  close() {
    this.modal.close();
  }
}