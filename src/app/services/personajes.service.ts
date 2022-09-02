import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personajes } from '../interface/personaje.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  private url= 'https://swapi.dev/api/people/'
  constructor(private http: HttpClient) { }

  getPersonajes(page: number){
    return this.http.get<Personajes>(`${this.url}?page=${page}`);
  }

  busqueda(termino: string){
    return this.http.get<Personajes>(`${this.url}?search=${termino}`)
  }

}
