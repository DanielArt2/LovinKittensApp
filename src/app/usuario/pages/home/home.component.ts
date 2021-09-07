import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titulo:string;
  datosGatokiller:number;
  
  constructor() {
    this.titulo = "HOME";
    this.datosGatokiller = 0;
    this.datosGatokiller = parseInt(localStorage.getItem('killerCat')!);
    if(isNaN(this.datosGatokiller)){
      this.datosGatokiller = 0;
    }
  }

  ngOnInit(): void {
  }

}
