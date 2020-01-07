import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pspage',
  templateUrl: './pspage.component.html',
  styleUrls: ['./pspage.component.scss']
})
export class PspageComponent implements OnInit {
  public pwControl:FormGroup;
  public isPwcheckDisabled:boolean;
  public resultmsg:boolean = false;
  public message:string;
  public token:string;

  constructor(
    private requestS:RequestService,
    private route: ActivatedRoute
    ) {
      this.pwControl = new FormGroup({
        password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        retrypassword: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)])
      });
    }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap['params']['token'];
    this.pwControl.setValue({
      password: '',
      retrypassword: ''
    });
  }
  /**
   * パスワードの登録
   *
   * @returns {void}
   * @memberof PspageComponent
   * @description
   * DIでパスワード登録用のトークンとパスワードデータを含んだリクエストのobservableを作成し、処理後のメッセージ表示を行う
   */
  pwregist() :void {
    this.requestS.setBasicPw('pwregist', this.pwControl.value, this.token)
    .subscribe(result => {
      this.message = result.message;
      this.resultmsg = true;
    },
    err=>{
      this.message = err.error.message;
      this.resultmsg = true;
    });
  }
  /**
   * パスワードの再確認
   *
   * @returns {void}
   * @memberof PspageComponent
   * @description
   * 入力されたパスワードと再入力されたパスワードが一致しているかを確認し、不一致の場合は登録ボタンの無効化を行う
   */
  pwcheck() :void {
    this.isPwcheckDisabled = true;
    if (this.pwControl.value.password === this.pwControl.value.retrypassword) {this.isPwcheckDisabled = false;}
  }
}