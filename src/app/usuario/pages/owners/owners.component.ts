import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Datum } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styles: [
  ]
})
export class OwnersComponent implements OnInit {
  titulo:string;
  datosGatokiller:number;
  //Datum viene de la interfaz creada del "user", que verifica que solo entren datos que sean igual a los datos de la API
  users: Datum[];
  hayError: boolean;
  detalles: boolean;
  usuarioSeleccionado : any;
  botonDetalles: boolean;
  numTelefono:number;
  numPagina:number;
  usersFav: any[];
  postUsuarios: any[];

  constructor(private usuarioService:UsuarioService) {
    this.titulo = "OWNERS";
    this.datosGatokiller = 0;
    this.users = [];
    this.hayError = false;
    this.detalles = false;
    this.usuarioSeleccionado = [];
    this.botonDetalles = false;
    this.numTelefono = 0;
    this.numPagina = 1;
    this.usersFav = [];
    this.postUsuarios = [];
    this.usuarioService.mostrarUsuarios().subscribe((resp)=>{
      this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
      if(resp.data.length > 0){
        this.users = resp.data;
        this.hayError = false;
      }else{
        this.hayError = true;
        this.users = [];
      }
    },(err)=>{
      
    })
   

   }

   //Metodo para ejecutar el usuario seleccionado, donde cargaremos los datos en detalles, aparte de subir +1 al contador killerCat
   seleccion(user:Datum){
    this.usuarioSeleccionado = user;
    this.numTelefono = Math.floor(Math.random() * 899999999) + 100000000;
    this.detalles = true;
    this.botonDetalles = false;
    this.usuarioService.postUsuarioSeleccionado(this.usuarioSeleccionado.id)
      .subscribe((resp)=>{
        this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
        this.postUsuarios = resp.data;
      })
  }

  //Metodo para añadir un usuario a favoritos
  aniadirFav(){
    //si existe el usuario en el localstorage no lo agrega
    if(!this.usersFav.includes(this.usuarioSeleccionado)){
      this.usersFav.push(this.usuarioSeleccionado);
      localStorage.setItem('favoritos',JSON.stringify(this.usersFav));
      this.usuarioService.setChekNewUser$(true);
    }

  }

  //Metodo para mostrar más usuarios, cargando 1 a 1 las páginas siguientes de la API, antes usé el botón "Mostrar más" pero mejoré poniendo el infiniteScroll
  mostrarMas(){
    this.numPagina += 1;
    this.usuarioService.usuariosPaginas(this.numPagina)
    .subscribe((resp)=>{
      this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
      this.users = this.users.concat(resp.data);  
    })
  
    
  }

  ngOnInit(): void {
    if(localStorage.hasOwnProperty('favoritos')&&localStorage.getItem('favoritos')){
      this.usersFav = JSON.parse(localStorage.getItem('favoritos')??"");

    }
  }

}
