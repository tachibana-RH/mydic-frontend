import { Injectable } from '@angular/core';

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

  public item:itemProps = {
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
  public contentsIndex:number = 0;

}
