import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

  /**
   * 各リクエスト処理のオブジェクト作成を行うDI
   *
   * @description
   * APIサーバにリクエストを送るObservableを作成する
   */
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: null
  };
  private apiUrl:string = environment.apiUrl;

  constructor(private client:HttpClient, private cookieService:CookieService) {}
  /**
   * ベーシックユーザーの新規登録処理
   *
   * @param {string} path  ユーザーの新規登録を行うサーバーのパス名（signup）
   * @param {object} body  Emailとユーザー名のフォームデータ
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * ユーザーの新規登録処理にリクエストを送るObservableを作成する
   */
  public setRegistration(path:string,body:object) :Observable<any> {
    this.headerSet();
    return this.client.post(`${this.apiUrl}/auth/${path}`,body,this.httpOptions);
  }
  /**
   * パスワードの登録処理
   *
   * @param {string} path  パスワード登録を行うサーバーのパス名（pwregist）
   * @param {object} body  登録するパスワードのフォームデータ
   * @param {string} token 本人確認と登録期限確認を行うトークン
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * パスワードの登録処理にリクエストを送るObservableを作成する
   */
  public setBasicPw(path:string, body:object, token:string) :Observable<any> {
    this.setAuthorization(token);
    return this.client.post(`${this.apiUrl}/auth/${path}`, body, this.httpOptions);
  }
  /**
   * ベーシックのログイン処理
   *
   * @param {string} path  ベーシックログインを行うサーバーのパス名（basic）
   * @param {object} body  Emailとパスワードのフォームデータ
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * パスワードの登録処理にリクエストを送るObservableを作成する
   */
  public setBasic(path:string, body:object) :Observable<any> {
    this.headerSet();
    return this.client.post(`${this.apiUrl}/auth/${path}`, body, this.httpOptions);
  }
  /**
   * 認証トークンの取得処理
   *
   * @param {string} path 認証トークンの取得を行うサーバーのパス名（basic or guestlogin）
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * 認証トークンの取得処理にリクエストを送るObservableを作成する
   */
  public setAuth(path:string) :Observable<any> {
    this.headerSet();
    return this.client.post<any>(`${this.apiUrl}/auth/${path}`,this.httpOptions);
  }
  /**
   * コンテンツの読み込み処理
   *
   * @param {string} path 読み込み処理を行うサーバーのパス名（guestGetContents or getContents）
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * コンテンツ読み込み処理にリクエストを送るObservableを作成する
   */
  public setAppGet(path:string) :Observable<any> {
    this.headerSet();
    return this.client.get(`${this.apiUrl}/app/${path}`,this.httpOptions);
  }
  /**
   * コンテンツの登録処理
   *
   * @param {string} path 登録処理を行うサーバーのパス名（guestRegistContents or registContents）
   * @param {object} body 登録対象コンテンツのフォームデータ
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * コンテンツ登録処理にリクエストを送るObservableを作成する
   */
  public setAppPost(path:string,body:object) :Observable<any> {
    this.headerSet();
    return this.client.post(`${this.apiUrl}/app/${path}`,body,this.httpOptions);
  }
  /**
   * コンテンツの更新処理
   *
   * @param {string} path 更新処理を行うサーバーのパス名（guestEditContents or editContents）
   * @param {object} body 更新対象コンテンツのフォームデータ
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * コンテンツ更新処理にリクエストを送るObservableを作成する
   */
  public setAppPut(path:string, body:object) :Observable<any> {
    this.headerSet();
    return this.client.put(`${this.apiUrl}/app/${path}`,body,this.httpOptions);
  }
  /**
   * コンテンツの削除処理
   *
   * @param {string} path 削除処理を行うサーバーのパス名（guestDeleteContents or DeleteContents）
   * @param {object} body 削除対象コンテンツのフォームデータ
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * コンテンツ削除処理にリクエストを送るObservableを作成する
   */
  public setAppDelete(path:string,body:object) :Observable<any> {
    this.headerSet();
    return this.client.delete(`${this.apiUrl}/app/${path}/${body['contentsId']}`,this.httpOptions);
  }
  /**
   * お問い合わせ処理
   *
   * @param {string} path  お問い合わせの送信を行うサーバーのパス名（contact）
   * @param {object} body  お問い合わせ内容のフォームデータ
   * @returns {Observable}
   * @memberof RequestService
   * @description
   * お問い合わせ処理にリクエストを送るObservableを作成する
   */
  public setContact(path:string,body:object) :Observable<any> {
    this.headerSet();
    return this.client.post(`${this.apiUrl}/auth/${path}`,body,this.httpOptions);
  }
  /**
   * Authorizatino に認証トークンを設定するメソッドの呼び出し元
   *
   * @param {void}
   * @returns {void}
   * @memberof RequestService
   * @description
   * ゲストユーザーとログイン済みのユーザーで別のトークンをヘッダに設定する
   */
  private headerSet() :void {
    this.cookieService.get('authToken') === '' ?
    this.setAuthorization(this.cookieService.get('guestToken')):
    this.setAuthorization(this.cookieService.get('authToken'));
  }
  /**
   * REST-API 実行時のエラーハンドラ
   * (toPromise.then((res) =>{}) を利用する場合のコード)
   *
   * @private
   * @param {any} err エラー情報
   * @memberof RequestService
   */
  private errorHandler(err) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }
  /**
   * Authorizatino に認証トークンを設定する
   *
   * @param {string} token 認証トークン
   * @returns {void}
   * @memberof RequestService
   * @description
   * トークンを動的に設定できるようメソッド化
   * Bearer トークンをヘッダに設定したい場合はこのメソッドを利用する
   */
  private setAuthorization(token: string = null): void {
    if (!token) {
      return;
    }
    const bearerToken: string = `Bearer ${token}`;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', bearerToken);
  }
}
