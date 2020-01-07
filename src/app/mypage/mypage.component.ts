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

interface initItemProps {
  username:string;
  contents: [{
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
  }];
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

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss'],
  providers:[ModalService]
})
export class MypageComponent implements OnInit {

  public username:string;
  public genreControl:FormGroup;
  public data:itemProps[];
  public searchInput:string;
  public selectTags:string[];
  public tagNames:string[]=[];
  public apiurl:string;
  public loginStatus:boolean;
  public tokenError:boolean;
  public tokenErrorMessage:string;

  private reqObservable:any;
  private dataOrigin:itemProps[] = [];
  private dataGenre:itemProps[];
  private currentGenre:string;
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
      let expiredDate:Date = new Date();
      expiredDate.setDate(expiredDate.getDate()+1);
      this.cookieService.set('authToken',
        this.route.snapshot.paramMap['params']['token'],
        expiredDate,
        '/'
        );
      this.router.navigate(['mypage']);
      return;
    }
    //　データ購読によるコンテンツの各反映を行うsubscription
    this.subscription = this.modalS.regist$
    .subscribe(value => {
      this.dataRegist(value);
      this.selectGenre(this.currentGenre);
    });
    this.subscription = this.modalS.edit$
    .subscribe(value => {
      this.dataEdit(value);
      this.selectGenre(this.currentGenre);
    });
    this.subscription = this.modalS.delete$
    .subscribe(value => {
      this.dataDelete(value);
      this.selectGenre(this.currentGenre);
    });

    this.genreControl = new FormGroup({
      tags: new FormControl()
    });
    //　ゲストユーザーとログイン後ユーザーで作成するobservableを分ける
    if (this.cookieService.get('authToken') === '') {
      this.loginStatus = true;
      this.reqObservable = this.requestS.setAppGet('guestGetContents');
      this.snackbar.open('ゲストユーザーの利用期限は7日間です。期限が過ぎると登録されたデータは閲覧できなくなります。', null, {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        panelClass: ['guestinfo-bar']
      });
    } else {
      this.loginStatus = false;
      this.reqObservable = this.requestS.setAppGet('getContents');
    }

    this.tokenError = false;
    //　上で作成したobservableを実行してコンテンツデータの取得を行う
    this.reqObservable.subscribe((result:initItemProps)=>{
      this.username = result.username;
      this.currentGenre = 'all';
      this.dataOrigin = result.contents;
      this.selectGenre(this.currentGenre);
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
   * コンテンツ一覧がジャンル検索で更新された時、
   * ジャンル検索後データの保存とその検索後のデータでドロップダウンのタグ作成を行う
   */
  contentsSet() :void {
    this.dataGenre = this.data;
    this.makeSelectTags(this.data);
  }
  /**
   * ドロップダウンのタグ作成
   * 
   * @param {itemProps[]} value コンテンツの配列データ
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * タグ検索のドロップダウン作成を行う
   */
  makeSelectTags(value:itemProps[]) :void {
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
    this.currentGenre = genreValue;
    if (genreValue === 'all') {
      this.data = this.dataOrigin;
    } else {
      let filterData = [];
      filterData.push(this.dataOrigin.filter(x=>x['genre']==genreValue));
      this.data = filterData[0];
    }

    this.contentsSet();
    
    if(typeof this.selectTags !== 'undefined') {
      this.selecttags();
      const datalength:number = this.data.length;
      if (datalength === 0) {
        this.searchInput = '';
        this.data = this.dataGenre;
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
    let selectTagsData:string = '';
    for (let tag of this.selectTags) {
      selectTagsData === '' ? selectTagsData = tag : selectTagsData += ' ' + tag;
    }
    this.searchInput = selectTagsData;
    this.data = this.tagsearch(this.dataGenre);
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
    this.data = this.tagsearch(this.dataGenre);
  }
  /**
   * タグ検索の実処理
   * 
   * @returns {itemProps[]}
   * @memberof MypageComponent
   * @description
   * タグ検索フォームに入力された値に部分一致するデータを返却する
   */
  tagsearch(searchGroup:itemProps[]) :itemProps[] {
    this.searchInput = this.searchInput.replace(/　/g,' ');
    if (this.searchInput.replace(/ /g,'') == '') {
      return this.dataGenre;
    }

    const searchValue:string[] = this.searchInput.split(' ');
    let searchCount:number = 0;
    for (let value of searchValue) {
      if (value !== ''){searchCount++;}
    }
    let dataTemp = [];

    for (let item of searchGroup) {
      let matchCount:number = 0;
      for (let value of searchValue) {
        for (let tag of item['tags'].split(',')) {
          if(value === '') { break; }
          if(tag.includes(value)) {
            matchCount++;
          }
        }
      }
      if (searchCount <= matchCount) {dataTemp.push(item);}
    }
    return dataTemp;
  }
  /**
   * 新規登録されたコンテンツの反映
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * 新規登録されたコンテンツデータをマイページに反映する
   */
  dataRegist(addData:itemProps) :void {
    const datalength:number = this.dataOrigin.length;
    if ( datalength === 0) {
      this.dataOrigin[0] = addData;
    } else {
      this.dataOrigin.unshift(addData);
    }
  }
  /**
   * 更新されたコンテンツの反映
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * 更新されたコンテンツデータをマイページに反映する
   */
  dataEdit(editData:itemProps) :void {
    this.dataOrigin[this.dataOrigin.findIndex(item=>item['id'] === editData['id'])] = editData;
  }
  /**
   * 削除されたコンテンツの反映
   * 
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * 削除されたコンテンツデータをマイページに反映する
   */
  dataDelete(deleteData:itemProps) :void {
    let filterData = [];
    filterData.push(
      this.dataOrigin.filter(item=>{
        if (item['id'] !== deleteData['id']) return true;
      })
    );
    this.dataOrigin = filterData[0];
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
   * @param {itemProps} item 詳細表示するコンテンツデータ
   * @param {number} index 詳細表示するコンテンツのインデックス
   * @returns {void}
   * @memberof MypageComponent
   * @description
   * モーダルで詳細画面を表示する
   */
  detailget(item:itemProps, index:number) :void {
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
    this.senditemS.item = {
      id: 0,
      user_id: 0,
      title: '',
      url: '',
      imageurl: '',
      genre: '',
      tags: '',
      overview: '',
      created_at: '',
      updated_at: ''
    };
    this.modalS.open(CreateEditComponent,'create');
  }

}