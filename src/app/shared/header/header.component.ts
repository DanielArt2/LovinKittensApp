import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  //recibir el título y el contador de gatokiller
  @Input() titulo: string;
  @Input() gatokiller: number;

  favoritos:number;
  listaFav:boolean;
  constructor(private usuarioService: UsuarioService) {
    this.titulo = "";
    this.gatokiller = 0;
    this.listaFav = false;
    if(JSON.parse(localStorage.getItem('favoritos')!) != null){
      this.favoritos = JSON.parse(localStorage.getItem('favoritos')!).length;
    }else{
      this.favoritos = 0;
    }
   }

  

  //metodo para contar favoritos, si el localstorage está vacio nos dará null, si nos da null iniciamos favoritos a 0
  contarFav(){
    this.usuarioService.getChekNewUser$().subscribe( 
      (user) =>{
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
    this.contarFav();
  }


}
