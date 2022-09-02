import { Component, OnInit } from '@angular/core';
import { Result } from './interface/personaje.interface';
import { PersonajesService } from './services/personajes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StarApp';
  page=1
  cargando= true;
  disabledPrev=true;
  disabledNext=false;
  total=0;
  ultima=false;
  personaje: Result | undefined;
  public temp: Result[]=[];
  public personajes: Result[]=[];
  constructor(private personajeService: PersonajesService){ }

  ngOnInit(): void {
    this.getPersonajes();
  }

  getPersonajes(){
    this.cargando=true;
    this.personajeService.getPersonajes(this.page).subscribe(
      resp=> {
        this.cargando=false;
        this.personajes=resp.results;
        this.temp=resp.results;
        this.total=resp.count;

      }
    );
  }

  //paginacion
  Pagina(pagina: number){
    this.page += pagina;
    if (this.page <=1) {
      this.page = 1;
      this.disabledPrev=true;

    }else if (this.page >= this.total/10) {
      this.page = Math.ceil(this.total/10);
      this.disabledNext=true;
    }else{
      this.disabledPrev=false;
      this.disabledNext=false;
    }
    this.getPersonajes();

  }

  //todas las caracteristicas
  verMax(personaje: Result|any){
    this.personaje= personaje;
  }

  //busqueda
  buscar(termino: string) {
    if(termino.length===0){
          return this.personajes=this.temp;
    }
    this.personajeService.busqueda(termino).subscribe(
      resp=> {
      this.personajes=resp.results;
      }
    );
    return;
  }

}
