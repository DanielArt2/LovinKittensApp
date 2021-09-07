import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { OwnersComponent } from './pages/owners/owners.component';
import { SearchComponent } from './pages/search/search.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProComponent } from './pages/pro/pro.component';



@NgModule({
  declarations: [
    HomeComponent,
    OwnersComponent,
    SearchComponent,
    ProComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    InfiniteScrollModule
  ],
  exports:[
    HomeComponent,
    OwnersComponent,
    SearchComponent
  ]
})
export class UsuarioModule { }
