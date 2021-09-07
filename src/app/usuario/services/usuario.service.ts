import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl : string = 'https://gorest.co.in/public/v1';
  //gracias a BehaviorSubject podemos tener un observable que vigila cuando entra "true" al hacer algo, cuando lo detecta, ejecuta lo ordenado
  //Con ello haré la conexión a la listafav
  private checkNewUser : BehaviorSubject<any>;

  constructor(private http:HttpClient ) {
    this.checkNewUser = new BehaviorSubject(false);
    if(localStorage.getItem('killerCat') == null){
      localStorage.setItem('killerCat','0');
    }
   }

   //getter y setter para behaviorsubject
   setChekNewUser$( checkNewUser:boolean){
      this.checkNewUser.next(checkNewUser);
   }

   getChekNewUser$():Observable<boolean>{
    return this.checkNewUser.asObservable();
 }

   subirKillerCat(){
    let killerCat:number = parseInt(localStorage.getItem('killerCat')!);
    killerCat += 1;
    localStorage.setItem('killerCat',killerCat.toString());
   }

  mostrarUsuarios():Observable<User>{
    const url = `${this.apiUrl}/users`;
    this.subirKillerCat();    
    return this.http.get<User>(url);
  }

  buscarUsuario(termino:string):Observable<User>{
    const url = `${this.apiUrl}/users?name=${termino}`;
    this.subirKillerCat();
    return this.http.get<User>(url);
  }

  buscarUsuarioPaginas(termino:string,pagina:number):Observable<User>{
    const url = `${this.apiUrl}/users?name=${termino}&page=${pagina}`;
    this.subirKillerCat();
    return this.http.get<User>(url);
  }

  postUsuarioSeleccionado(termino:string):Observable<any>{
    const url= `${this.apiUrl}/users/${termino}/posts`;
    this.subirKillerCat();
    return this.http.get<any>(url);
  }

  usuariosPaginas(pagina:number):Observable<User>{
    const url = `${this.apiUrl}/users?page=${pagina}`;
    this.subirKillerCat();
    return this.http.get<User>(url);
  }





}
