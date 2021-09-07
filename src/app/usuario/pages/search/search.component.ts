import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Datum } from '../../interfaces/usuario.interface';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

    datosGatokiller:number;
    debouncer: Subject<string>;
    titulo:string;
    termino : string;
    hayError : boolean;
    users: Datum[];
    detalles: boolean;
    numTelefono:number;
    usuarioSeleccionado: any;
    botonDetalles: boolean;
    numPagina:number;
    usersFav: any[];
    postUsuarios: any[];


  constructor(private usuarioService:UsuarioService) {
    this.debouncer = new Subject();
    this.datosGatokiller = 0;
    this.titulo = "SEARCH";
    this.termino = '';
    this.hayError = false;
    this.users = [];
    this.detalles = false;
    this.numTelefono = 0;
    this.usuarioSeleccionado = {};
    this.botonDetalles = false;
    this.numPagina = 1;
    this.usersFav = [];
    this.postUsuarios = [];
    this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
   }
 
  seleccion(user:Datum){
    this.usuarioSeleccionado = user;
    this.numTelefono = Math.floor(Math.random() * 899999999) + 100000000;
    this.botonDetalles = false;
    this.detalles = true;
    this.usuarioService.postUsuarioSeleccionado(this.usuarioSeleccionado.id)
      .subscribe((resp)=>{
        this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
        this.postUsuarios = resp.data;
      })
  }
  
  mostrarMas(){
    this.numPagina += 1;
    this.usuarioService.buscarUsuarioPaginas(this.termino,this.numPagina)
    .subscribe((resp)=>{
      this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
      this.users = this.users.concat(resp.data);  
    })
    
  }

  teclaPresionada( event:any){
    console.log(event.target.value);
  }


  buscar(){
    if(this.termino.length > 1){
      this.detalles = false;
    
      this.usuarioService.buscarUsuario(this.termino)
      .subscribe((resp) =>{
      this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
        if(resp.data.length > 0){
          this.users = resp.data;
          this.hayError = false;
        }else{
          this.hayError = true;
          this.users = [];

        }
      },(err)=>{
        this.hayError = true;
        this.users = [];
      });
    }
  }

  aniadirFav(){
    //si existe el usuario en el localstorage no lo agrega
    if(!this.usersFav.includes(this.usuarioSeleccionado)){
      this.usersFav.push(this.usuarioSeleccionado);
      localStorage.setItem('favoritos',JSON.stringify(this.usersFav));
      this.usuarioService.setChekNewUser$(true);
    }

  }

  ngOnInit(): void {
    this.debouncer.subscribe( valor =>{
      console.log('debouncer', valor);
    })

    if(localStorage.hasOwnProperty('favoritos')&&localStorage.getItem('favoritos')){
      this.usersFav = JSON.parse(localStorage.getItem('favoritos')??"");

    }
  }

}
