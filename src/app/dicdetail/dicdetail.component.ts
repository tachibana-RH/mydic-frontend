import { Component, OnInit, Inject } from '@angular/core';
import { ModalService } from "../modal.service";
import { SendItemService } from '../send-item.service';
import { RequestService } from '../request.service';
import { CookieService } from 'ngx-cookie-service';
import { CreateEditComponent } from '../create-edit/create-edit.component'
import { MatDialog, MatDialogRef } from '@angular/material';

  /**
   * 削除ボタンを押下した時に表示する確認メッセージダイアログのテンプレート
   */
@Component({
  selector: 'alert-dialog',
  template: `
  <h1 mat-dialog-title style="font-size:16px; text-align: center;">削除してよろしいですか?</h1>
  <div mat-dialog-actions>
    <button mat-button (click)="okClick()">Ok</button>
    <button mat-button (click)="cancelClick()">Cancel</button>
  </div>
`
})
export class AlertDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>
    ) {}

  okClick(): void {
    this.dialogRef.close(true);
  }
  cancelClick(): void {
    this.dialogRef.close(false);
  }
}

@Component({
  selector: 'app-dicdetail',
  templateUrl: './dicdetail.component.html',
  styleUrls: ['./dicdetail.component.scss']
})
export class DicdetailComponent implements OnInit {

  public item:any;

  constructor(
    private senditemS:SendItemService,
    private modalS:ModalService,
    private dialog:MatDialog,
    private cookieService:CookieService,
    private requestS:RequestService
  ) {
  }

  ngOnInit(): void {
    this.item = this.senditemS.item;
  }
  /**
   * 編集画面の表示
   *
   * @returns {void}
   * @memberof DicdetailComponent
   * @description
   * モーダルで現在に詳細画面を開いているコンテンツの編集画面を表示する
   */
  edit(): void {
    this.modalS.open(CreateEditComponent,'edit');
  }
  /**
   * コンテンツの削除
   *
   * @returns {void}
   * @memberof DicdetailComponent
   * @description
   * 削除確認のダイアログを表示し「OK」が押下された場合、コンテンツ削除のリクエストobservableを作成し、
   * 削除したコンテンツをマイページへ反映する
   */
  delete(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cookieService.get('authToken') === ''?
          this.requestS.setAppDelete('guestDeleteContents', {contentsId: this.senditemS.item['id']}):
          this.requestS.setAppDelete('deleteContents', {contentsId: this.senditemS.item['id']});
        
        this.requestS.clientOb.subscribe(result => {
          this.modalS.deleteContents(this.senditemS.contentsIndex);
          this.modalS.close();
        },
        err => {
          console.log(err);
        });
      }
    });
  }
  /**
   * 詳細画面の破棄
   *
   * @returns {void}
   * @memberof DicdetailComponent
   * @description
   * 現在開いている詳細画面を閉じる
   */
  close(): void {
    this.modalS.close();
  }

}
