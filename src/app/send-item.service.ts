import { Injectable } from '@angular/core';

  /**
   * 各コンポーネント間でデータの受け渡しを行うDI
   * 
   * @param {Array}  item コンテンツデータ
   * @param {number} contentsIndex コンテンツデータのインデックス番号
   * @description
   * コンテンツの詳細表示や編集モーダルで使用する
   */
@Injectable({
  providedIn: 'root'
})
export class SendItemService {

  constructor() { }

  public item:string[] = [];
  public contentsIndex:number = 0;

}
