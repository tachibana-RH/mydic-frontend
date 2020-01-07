import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toppage',
  templateUrl: './toppage.component.html',
  styleUrls: ['./toppage.component.scss']
})
export class ToppageComponent implements OnInit {

  private expiredDate:Date;

  constructor(
    private router:Router,
    private requestService:RequestService,
    private cookieService:CookieService
    ) {}

  ngOnInit() {
    if (this.cookieService.get('guestToken') !== '') { this.router.navigate(['mypage']); }
  }
  /**
   * ゲストユーザーの認証トークン取得を行う
   *
   * @returns {void}
   * @memberof ToppageComponent
   * @description
   * ゲストユーザーとしての認証トークンをサーバから取得しマイページへ移動する
   * トークンの有効期限は7日間とする
   */
  guestlogin() :void {
    this.requestService.setAuth('guestlogin')
    .subscribe((result:object)=>{
      this.expiredDate = new Date();
      this.expiredDate.setDate(this.expiredDate.getDate()+7);
      this.cookieService.set('guestToken', result['token'], this.expiredDate);
      this.router.navigate(['mypage']);
    },
    err =>{
      console.log(err);
    });
  }
}
