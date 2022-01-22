import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private error$ = new Subject<string>()
  private terminoBusqueda$ = new Subject<string>()

  constructor(private _http:HttpClient ) {  }

  setError(mensaje:string){
    this.error$.next(mensaje)
  }

  getError():Observable<string> {
    return this.error$.asObservable();
  }

  setBusqueda(busqueda:string){
    this.terminoBusqueda$.next(busqueda)
  }

  getBusqueda():Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(termino:string ,imagenesPorPagina:number, page:number=1):Observable<any>{
    const KEY = "25350621-bef27104847104b698f86a9e0"
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${termino.split(' ').join('+')}&per_page=${imagenesPorPagina}&page=${page}`

    return this._http.get(URL);
  }
}
