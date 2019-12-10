import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MypageComponent } from './mypage/mypage.component';
import { DicdetailComponent, AlertDialogComponent } from './dicdetail/dicdetail.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { ModalEntryComponent } from './mypage/modal.component';
import { LoginComponent } from './login/login.component';

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
import { ToppageComponent } from './toppage/toppage.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PspageComponent } from './pspage/pspage.component';

const routes:Routes = [
  {path: '', component: ToppageComponent},
  {path: 'mypage', component: MypageComponent},
  {path: 'mypage/:token', component: MypageComponent},
  {path: 'pspage', component: PspageComponent},
  {path: 'pspage/:token', component: PspageComponent}
]

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
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(
      routes, { useHash: true }
    ),
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
