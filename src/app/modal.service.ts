import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { Subject } from 'rxjs';

  /**
   * モーダル画面の作成・削除を行うDIクラス
   */
@Injectable()
export class ModalService {
  public vcr: ViewContainerRef;
  private currentComponent = null;
  public contentType:string;

  private contentSource: Subject<boolean> = new Subject<boolean>();
  public content$ = this.contentSource.asObservable();

  private registdata: Subject<object> = new Subject<object>();
  public regist$ = this.registdata.asObservable();

  private editdata: Subject<object> = new Subject<object>();
  public edit$ = this.editdata.asObservable();

  private deletedata: Subject<number> = new Subject<number>();
  public delete$ = this.deletedata.asObservable();

  constructor(private resolver: ComponentFactoryResolver) { }
  /**
   * モーダル画面の表示を行う
   *
   * @param {component} data モーダル画面として表示するコンポーネントデータ
   * @param {string} type コンポーネント名
   * @returns {void}
   * @memberof ModalService
   * @description
   * 指定されたコンポーネントデータをモーダル画面のテンプレートに埋め込んで表示する
   */
  open(data: any, type:string): void {
    if (!data) {
      return;
    }
    this.contentType = type;
    const factory = this.resolver.resolveComponentFactory(data);
    const component = this.vcr.createComponent(factory);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
    this.contentSource.next(true);
  }
  /**
   * モーダル画面の削除を行う
   *
   * @returns {void}
   * @memberof ModalService
   * @description
   * 現在開いているモーダル画面の破棄を行う
   */
  close(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
      this.contentSource.next(false);
    }
  }
  /**
   * 登録したコンテンツをマイページに反映する
   *
   * @returns {void}
   * @memberof ModalService
   * @description
   * 登録したコンテンツデータをマイページのコンポーネントで宣言したsubscriptionに対して流す
   */
  registContents(data:object): void {
    this.registdata.next(data);
  }
  /**
   * 更新したコンテンツをマイページに反映する
   *
   * @returns {void}
   * @memberof ModalService
   * @description
   * 更新したコンテンツデータをマイページのコンポーネントで宣言したsubscriptionに対して流す
   */
  editContents(data:object): void {
    this.editdata.next(data);
  }
  /**
   * 削除したコンテンツをマイページに反映する
   *
   * @returns {void}
   * @memberof ModalService
   * @description
   * 削除したコンテンツのインデックスをマイページのコンポーネントで宣言したsubscriptionに対して流す
   */
  deleteContents(data:number): void {
    this.deletedata.next(data);
  }
}