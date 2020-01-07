import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypageComponent } from './mypage/mypage.component';
import { ToppageComponent } from './toppage/toppage.component';
import { PspageComponent } from './pspage/pspage.component';
import { PolicysComponent } from './policys/policys.component';

const routes:Routes = [
  {path: '', component: ToppageComponent},
  {path: 'mypage', component: MypageComponent},
  {path: 'mypage/:token', component: MypageComponent},
  {path: 'pspage', component: PspageComponent},
  {path: 'pspage/:token', component: PspageComponent},
  {path: 'policys/:title', component: PolicysComponent},
  {path:'**', redirectTo: 'mypage'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
