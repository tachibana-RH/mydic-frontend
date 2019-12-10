import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DicdetailComponent } from '../dicdetail/dicdetail.component';

import { SendItemService } from '../send-item.service';
import { ModalService } from '../modal.service';
import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

  /**
   * タグ数のチェックを行うバリデーション関数
   *
   * @param {string} formValue タグフォームに入力されたデータ
   * @returns {boolean}
   * @memberof CreateEditComponent
   * @description
   * スペース区切りで配列を作成し要素数が６以上であった場合はステータスにfalseを設定する
   */
function tagsCount(formValue: FormControl) :object {
  const numberOfTags:number = formValue.value.split(' ').length;
  return numberOfTags > 5 ? {tagsCount:{valid:false}} : null;
}
  /**
   * タグフォームの入力続行状態をチェックするバリデーション関数
   *
   * @param {string} formValue タグフォームに入力されたデータ
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * フォームに入力された値の末尾がスペース（タグ追加中）であった場合はステータスにfalseを設定する
   */
function tagsConfirm(formValue: FormControl) :object {
  const checktags:string = formValue.value.substr(-1,1);
  return checktags === ' ' ? {tagsConfirm:{valid:false}} : null;
}

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  public contentsInfo:FormGroup;
  public operationName:string;
  public genreOption:string[];
  public tags:string[];

  private contentJson:object;
  private snackRef:MatSnackBarRef<any>;
  private urlPattern:string;

  constructor(
    private senditemS:SendItemService,
    private modalS:ModalService,
    private cookieService:CookieService,
    private requestS:RequestService,
    private snackbar:MatSnackBar
    ) { }

  ngOnInit() {
    //　ジャンルデータ
    this.genreOption = [
      "study","jobs","movie","shopping","etc"
    ];
    //　URLのバリデーションチェックで使用する正規表現
    this.urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    //　フォームグループを生成
    this.contentsInfo = new FormGroup({
      url: new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]),
      genre: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required, tagsCount, tagsConfirm, Validators.maxLength(50)]),
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      overview: new FormControl('', [Validators.required, Validators.maxLength(300)])
    });
    //　編集モードだった場合はフォームグループに値を設定する
    if (this.senditemS.item.length === 0) {
      this.operationName = "create";
    } else {
      this.operationName = "edit";
      this.contentsInfo.setValue({
        url: this.senditemS.item['url'],
        genre: this.senditemS.item['genre'],
        tags: this.senditemS.item['tags'].replace(/,/g," "),
        title: this.senditemS.item['title'],
        overview: this.senditemS.item['overview']
      });
      this.tags = this.contentsInfo.value.tags.split(' ');
    }
  }
  /**
   * フォームグループへのタグデータ登録
   *
   * @param {string} value 登録するタグデータ
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * タグデータをテンプレートのフォームグループに反映する
   */
  setTagsValue(value:string) :void {
    this.contentsInfo.setValue({
      url: this.contentsInfo.value.url,
      genre: this.contentsInfo.value.genre,
      tags: value,
      title: this.contentsInfo.value.title,
      overview: this.contentsInfo.value.overview
    });
  }
  /**
   * 入力データのタグ化
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * タグフォームに入力されたデータのタグ化を行う
   */
  createTags() :void {
    let tag = this.contentsInfo.value.tags.replace(/　/g, " ");
    this.setTagsValue(tag);

    if (tag.includes("  ")) {
      this.setTagsValue(tag.replace(/  */g, " "));
      tag = this.contentsInfo.value.tags;
    }

    if(tag.substr(-1,1) !== ' ') { return; }

    if (tag === ' ') {
      this.setTagsValue('');
      this.tags = [];
    } else {
      this.tags = tag.split(' ');
      if (this.tags.slice(-1)[0] === '') {
        this.tags.pop();
      }
    }
  }
  /**
   * タグの再編集
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * タグフォームがフォーカスされた時、タグを全て削除し編集可能にする
   */
  tagEdit() :void {
    this.tags=[];
  }
  /**
   * カーソルが外れた際のタグ化
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * カーソルが外れた時、フォームの値を全てタグ化する
   */
  makeTagsAll() :void {
    this.tags = this.contentsInfo.value.tags.split(' ');
    if(this.contentsInfo.value.tags.substr(-1,1) === ' '){
      this.setTagsValue(this.contentsInfo.value.tags.substr(0,this.contentsInfo.value.tags.length-1));
      this.tags.pop();
    }
  }
  /**
   * スペース削除時の末尾タグ削除
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * スペースが削除された時にタグを削除し編集できるようにする
   */
  deleteTags() :void {
    if (this.contentsInfo.value.tags.substr(-1,1) === ' ') {
      this.tags.pop();
    }
  }
  /**
   * スペース削除時の全タグ削除
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * 末尾タグ以外のスペースが削除された時に全てのタグを削除し編集できるようにする
   */
  deleteTagsAll() :void {
    if(this.contentsInfo.value.tags.split(' ').length === this.tags.length) {
      this.tags = [];
    }
  }
  /**
   * コンテンツの登録
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * DIでコンテンツ新規登録のリクエストobservableを作成し、登録したコンテンツをマイページへ反映する
   */
  create() :void {
    this.contentsInfo.value.tags = this.contentsInfo.value.tags;
    //observableの作成
    this.cookieService.get('authToken') === '' ?
      this.requestS.setAppPost('guestRegistContents',{contentsInfo: this.contentsInfo.value}):
      this.requestS.setAppPost('registContents',{contentsInfo: this.contentsInfo.value});
    //observableの実行
    this.requestS.clientOb.subscribe((result:object)=>{
      this.contentJson = {
          "id": result['id'],
          "url": result['url'],
          "imageurl": result['imageurl'],
          "genre": result['genre'],
          "tags": result['tags'],
          "title": result['title'],
          "overview": result['overview']
      }

      this.modalS.close();

      this.snackRef = this.snackbar.open('コンテンツを登録中です。少々お待ちください。', null, {
        duration: 10000,
        verticalPosition: 'bottom',
        panelClass: ['contentsregist-bar']
      });
      setTimeout(()=>{this.modalS.registContents(this.contentJson)},10000);
    },
    err => {
      console.log(err);
    });
  }
  /**
   * コンテンツの編集
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * DIでコンテンツ編集のリクエストobservableを作成し、編集したコンテンツをマイページへ反映する
   */
  edit() :void {
    // コンテンツに変更があったかをチェック
    // 変更がなければ処理を終了する
    if (this.contentsInfo.value.url === this.senditemS.item['url'] &&
        this.contentsInfo.value.genre === this.senditemS.item['genre'] &&
        this.contentsInfo.value.tags === this.senditemS.item['tags'].replace(/,/g," ") &&
        this.contentsInfo.value.title === this.senditemS.item['title'] &&
        this.contentsInfo.value.overview === this.senditemS.item['overview']
        ) {
      this.modalS.close();
      return;
    }
    //observableの作成
    this.cookieService.get('authToken') === '' ?
      this.requestS.setAppPut('guestEditContents',{contentsId: this.senditemS.item['id'], contentsInfo: this.contentsInfo.value}):
      this.requestS.setAppPut('editContents',{contentsId: this.senditemS.item['id'], contentsInfo: this.contentsInfo.value});
    //observableの実行
    this.requestS.clientOb.subscribe((result:object) => {
      result['contentsIndex'] = this.senditemS.contentsIndex;
      this.modalS.close();
      if (result['url'] !== this.senditemS.item['url']) {
        this.snackRef = this.snackbar.open('コンテンツの画像を取得中です。少々お待ちください。', null, {
          duration: 10000,
          verticalPosition: 'bottom',
          panelClass: ['contentsedit-bar']
        });
        setTimeout(()=>{this.modalS.editContents(result)},10000);
      } else {
        this.modalS.editContents(result);
      }
    });
  }
  /**
   * モーダル画面から詳細画面への遷移
   *
   * @returns {void}
   * @memberof CreateEditComponent
   * @description
   * 編集モーダル画面から詳細モーダル画面へ変更する
   */
  cancel() :void {
    this.senditemS.item.length === 0 ?
      this.modalS.close() :
      this.modalS.open(DicdetailComponent,'detail');
  }

}
