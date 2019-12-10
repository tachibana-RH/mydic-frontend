import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginControl:FormGroup;
  public registControl:FormGroup;
  public apiUrl:string = environment.apiUrl;
  public registMessage:boolean;

  constructor(
    private requestS:RequestService,
    private snackbar:MatSnackBar
    ) {}

  ngOnInit() {
    this.loginControl = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
    this.registControl = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required, Validators.email])
    });
    this.registMessage = false;
  }
  /**
   * OAuth認証ページへの遷移
   *
   * @returns {void}
   * @memberof LoginComponent
   * @description
   * 選択されたプロバイダーの認証ページへ遷移する
   */
  oauth(value:string) :void {
    window.location.href = `${this.apiUrl}/auth/${value}`;
  }
  /**
   * ベーシック認証用ユーザーの新規登録
   *
   * @returns {void}
   * @memberof LoginComponent
   * @description
   * DIでユーザーの新規登録リクエストのobservableを作成し、処理後のメッセージ表示を行う
   */
  regist() :void {
    this.requestS.setRegistration('signup', this.registControl.value);
    this.requestS.clientOb.subscribe((result)=>{
      this.registMessage = true;
      console.log(result);
    },
    err=>{
      this.snackbar.open(err.error.message, null, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['newregist-bar']
      });
    });
  }
  /**
   * ベーシック認証の実行
   *
   * @returns {void}
   * @memberof LoginComponent
   * @description
   * DIでベーシック認証リクエストのobservableを作成し、認証トークンの取得を行う
   */
  login() :void {
    this.requestS.setBasic('basic', this.loginControl.value);
    this.requestS.clientOb.subscribe((result)=>{
      window.location.href = `/mypage/${result.token}`;
    },
    err=>{
      this.snackbar.open(err.error.message, null, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['loginregist-bar']
      });
    });
  }
}
