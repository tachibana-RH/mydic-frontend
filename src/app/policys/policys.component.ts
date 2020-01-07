import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-policys',
  templateUrl: './policys.component.html',
  styleUrls: ['./policys.component.scss']
})
export class PolicysComponent implements OnInit {
  public contactControl:FormGroup;
  public terms:boolean;
  public privacy:boolean;
  public contact:boolean;

  constructor(
    private route: ActivatedRoute,
    private requestS:RequestService,
    private snackbar:MatSnackBar) {
    this.contactControl = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      subject: new FormControl('',[Validators.required]),
      text: new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
    this.terms = false;
    this.privacy = false;
    this.contact = false;
    this.contactControl.setValue({
      email: '',
      subject: '',
      text: ''
    });
    switch(this.route.snapshot.paramMap['params']['title']) {
      case 'terms':
        this.terms = true;
        break;
      case 'privacy':
        this.privacy = true;
        break;
      case 'contact':
        this.contact = true;
        break;
    }
  }

  contactsub():void {
    this.requestS.setContact('contact', this.contactControl.value)
    .subscribe(result => {
      this.snackbar.open('お問い合わせありがとうございます。3営業日以内に返信いたします。', null, {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.contactControl.setValue({
        email: '',
        subject: '',
        text: ''
      });
    },
    err => {
      this.snackbar.open('お問い合わせを送信できませんでした。', null, {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }

}
