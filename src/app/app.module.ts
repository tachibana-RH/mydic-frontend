import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MypageComponent } from './mypage/mypage.component';
import { DicdetailComponent, AlertDialogComponent } from './dicdetail/dicdetail.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { ModalEntryComponent } from './mypage/modal.component';
import { LoginComponent } from './login/login.component';
import { ToppageComponent } from './toppage/toppage.component';
import { PspageComponent } from './pspage/pspage.component';
import { PolicysComponent } from './policys/policys.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatToolbarModule,
         MatIconModule,
         MatOptionModule,
         MatSelectModule,
         MatMenuModule,
         MatButtonToggleModule, 
         MatDialogModule} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    DicdetailComponent,
    CreateEditComponent,
    ToppageComponent,
    ModalEntryComponent,
    LoginComponent,
    PspageComponent,
    AlertDialogComponent,
    PolicysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [{provide: COMPOSITION_BUFFER_MODE, useValue:false}, CookieService],
  entryComponents: [
    DicdetailComponent,
    CreateEditComponent,
    LoginComponent,
    AlertDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
