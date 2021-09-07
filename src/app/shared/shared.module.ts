import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ListaFavComponent } from './lista-fav/lista-fav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ListaFavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class SharedModule { }
