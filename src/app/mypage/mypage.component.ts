import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { SendItemService } from '../send-item.service';
import { ModalService } from '../modal.service';
import { RequestService } from '../request.service';
import { DicdetailComponent } from '../dicdetail/dicdetail.component';
import { CreateEditComponent } from '../create-edit/create-edit.component'
import { LoginComponent }  from '../login/login.component';

import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss'],
  providers:[ModalService]
})
export class MypageComponent implements OnInit {

  public username:string;
  public genreControl:FormGroup;
  public data:string[];
  public searchInput:string;
  public selectTags:string;
  public tagNames:string[]=[];
  public apiurl:string;
  public loginStatus:boolean;
  public tokenError:boolean;
  public tokenErrorMessage:string;

  private dataOrigin:string[];
  private dataCurrent:string[];
  private dataTemp:string[];
  private searchValue:string[];
  private searchCount:number;
  private matchCount:number;
  private selectTagsData:string;
  private expiredDate:Date;
  private subscription: Subscription;

  constructor(
    private router:Router,
    private senditemS:SendItemService,
    private modalS:ModalService,
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private requestS:RequestService,
    private snackbar:MatSnackBar
    ) {
      this.apiurl = environment.apiUrl;
    }

  ngOnInit() {
    //　認証リダイレクト後のトークン取得処理
    if(this.route.snapshot.paramMap['params']['token'] !== undefined) {
      this.expiredDate = new Date();
      this.expiredDate.setDate(this.expiredDate.getDate()+1);
      this.cookieService.set('authToken',
        this.route.snapshot.paramMap['params']['token'],
        this.expiredDate,
        '/'
        );
      this.router.navigate(['mypage']);
      return;
    }
    //　データ購読によるコンテンツの各反映を行うsubscription
    this.subscription = this.modalS.regist$
    .subscribe(value => {
      this.dataRegist(value);
      this.contentsSet();
    });
    this.subscription = this.modalS.edit$
    .subscribe(value => {
      this.dataEdit(value);
      this.contentsSet();
    });
    this.subscription = this.modalS.delete$
    .subscribe(value => {
      this.dataDelete(value);
      this.contentsSet();
    });

    this.genreControl = new FormGroup({
      tags: new FormControl()
    });
    //　ゲストユーザーとログイン後ユーザーで作成するobservableを分ける
    if (this.cookieService.get('authToken') === '') {
      this.loginStatus = true;
      this.requestS.setAppGet('guestGetContents');
      this.snackbar.open('ゲストユーザーの利用期限は7日間です。期限が過ぎると登録されたデータは閲覧できなくなります。', null, {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        panelClass: ['guestinfo-bar']
      });
    } else {
      this.loginStatus = false;
      this.requestS.setAppGet('getContents');
    }

    this.tokenError = false;
    //　上で作成したobservableを実行してコンテンツデータの取得を行う
    this.requestS.clientOb.subscribe((result)=>{
      this.username = result.username;
      this.data = result.contents;
      this.contentsSet();
    },
    err =>{
      this.tokenError = true;
      this.tokenErrorMessage = err['error'].message;
      console.log(err);
    });
  }
  /**
   * コンテンツ更新時の反映
   *
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * コンテンツが何かしら更新された時に保持データの更新とドロップダウンのタグ作成を行う
   */
  contentsSet() :void {
    this.dataCurrent = this.data;
    this.dataOrigin = this.data;
    this.makeSelectTags(this.data);
  }
  /**
   * ドロップダウンのタグ作成
   * 
   * @param {Array} value コンテンツの配列データ
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * コンテンツが何かしら更新された時に保持データの更新とドロップダウンのタグ作成を行う
   */
  makeSelectTags(value:string[]) :void {
    this.tagNames = [];
    for(let item of value) {
      for(let tag of item['tags'].split(',')) {
        if(this.tagNames.indexOf(tag) < 0){this.tagNames.push(tag);}
      }
    }
    this.tagNames.sort();
  }
  /**
   * ジャンル検索
   * 
   * @param {string} genreValue 選択されたジャンル名
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * 選択されたジャンルに一致するデータをマイページに反映する
   * 既に選択されているタグがある場合さらにそのタグで絞り込みを行う
   */
  selectGenre(genreValue:string) :void {
    if (genreValue.toString() == 'all') {
      this.data = this.dataOrigin;
    } else {
      this.data = this.dataOrigin.filter(x=>x['genre']==genreValue);
    }
    
    this.dataCurrent = this.data;
    this.makeSelectTags(this.data);

    if(typeof this.selectTags !== 'undefined') {
      this.selecttags();
      if (this.data.length == 0) {
        this.searchInput = '';
        this.data = this.dataCurrent;
      }
    }
  }
  /**
   * タグ検索（選択）
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * ドロップダウンで選択されたタグに部分一致するデータをマイページに反映する
   */
  selecttags() :void {
    this.selectTagsData = '';
    for (let tag of this.selectTags) {
      this.selectTagsData === '' ? this.selectTagsData = tag : this.selectTagsData += ' ' + tag;
    }
    this.searchInput = this.selectTagsData;
    this.data = this.tagsearch(this.dataCurrent);
  }
  /**
   * タグ検索（入力）
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * タグ検索フォームに入力された値に部分一致するデータをマイページに反映する
   */
  search() :void {
    this.data = this.tagsearch(this.dataCurrent);
  }
  /**
   * タグ検索の実処理
   * 
   * @returns {Array}
   * @memberof MypageComponent
   * @description
   * タグ検索フォームに入力された値に部分一致するデータを返却する
   */
  tagsearch(searchGroup:string[]) :string[] {
    this.searchInput = this.searchInput.replace(/　/g,' ');
    if (this.searchInput.replace(/ /g,'') == '') {
      return this.dataCurrent;
    }

    this.searchValue = this.searchInput.split(' ');
    this.searchCount = 0;
    for (let value of this.searchValue) {
      if (value !== ''){this.searchCount++;}
    }
    this.dataTemp = [];

    for (let item of searchGroup) {
      this.matchCount = 0;
      for (let value of this.searchValue) {
        for (let tag of item['tags'].split(',')) {
          if(value === '') { break; }
          if(tag.includes(value)) {
            this.matchCount++;
          }
        }
      }
      if (this.searchCount <= this.matchCount) {this.dataTemp.push(item);}
    }
    return this.dataTemp;
  }
  /**
   * 新規登録されたコンテンツの反映
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * 新規登録されたコンテンツデータをマイページに反映する
   */
  dataRegist(addData:any) :void {
    this.data.length === 0 ?
      this.data[0] = addData:
      this.data.unshift(addData);
  }
  /**
   * 更新されたコンテンツの反映
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * 更新されたコンテンツデータをマイページに反映する
   */
  dataEdit(editData:any) :void {
    this.data[editData.contentsIndex] = editData;
  }
  /**
   * 削除されたコンテンツの反映
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * 削除されたコンテンツデータをマイページに反映する
   */
  dataDelete(deleteData:number) :void {
    this.data.splice(deleteData, 1);
  }
  /**
   * ログイン画面の表示
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * モーダルでログイン画面を表示する
   */
  login() :void {
    this.modalS.open(LoginComponent,'login');
  }
  /**
   * ログアウト処理
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * クッキーに保存されている認証トークンを削除しページリロードを行う
   */
  logout() :void {
    this.cookieService.delete('authToken','/');
    window.location.reload();
  }
  /**
   * 詳細画面の表示
   * 
   * @param {Array} item 詳細表示するコンテンツデータ
   * @param {number} index 詳細表示するコンテンツのインデックス
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * モーダルで詳細画面を表示する
   */
  detailget(item:string[], index:number) :void {
    this.senditemS.item = item;
    this.senditemS.contentsIndex = index;
    this.modalS.open(DicdetailComponent,'detail');
  }
  /**
   * 新規作成画面の表示
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * モーダルで新規作成画面を表示する
   */
  addDic() :void {
    this.senditemS.item = [];
    this.modalS.open(CreateEditComponent,'create');
  }

}