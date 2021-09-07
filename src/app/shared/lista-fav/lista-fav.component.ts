import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Component({
  selector: 'app-lista-fav',
  templateUrl: './lista-fav.component.html'
})
export class ListaFavComponent implements OnInit {
  usersFav: any[];
  favoritos:number;

  constructor(public modal:NgbModal,private usuarioService:UsuarioService) { 
    this.usersFav= [];
    if(JSON.parse(localStorage.getItem('favoritos')!) != null){
      this.favoritos = JSON.parse(localStorage.getItem('favoritos')!).length;
    }else{
      this.favoritos = 0;
    }
  }
  // Creamos el método de listaFav para mostrar la lista, primero guardamos en una variable la información de localstorage Favoritos
  // para verificar si existe o no, si no existe se inicializa a array vacío,  luego contamos cuantos usuarios hay en localstorage 
  listaFav(){
    this.usuarioService.getChekNewUser$().subscribe( 
      (user) =>{
          this.usersFav = JSON.parse(localStorage.getItem('favoritos')!);
          if(this.usersFav == null){
            this.usersFav = [];
          }
          if(user){
            this.favoritos = JSON.parse(localStorage.getItem('favoritos')!).length;
            if(this.favoritos == null){
              this.favoritos = 0;
            }
          }
      }
    )
  }

  ngOnInit(): void {
    this.listaFav();

  }

}
