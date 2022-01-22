import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  
  private busqueda:Subscription;
  termino = ""
  
  listaImagenes: any[] = [];
  loading = false;
  
  //paginacion
  imagenesPorPagina = 28;
  pagina= 1;
  calcularTotalPaginas = 1;

  constructor(private _imagenesService:ImagenService) { 
    this.busqueda = this._imagenesService.getBusqueda().subscribe({
      next: d =>{
        this.termino = d;
        this.loading =true;
        this.obtenerImagenes();
      }
    })
  }

  obtenerImagenes(nueva:boolean = true){
    if(nueva) this.pagina = 1;
    this._imagenesService.getImagenes(this.termino,this.imagenesPorPagina,this.pagina).subscribe({
        next: d =>{
          if(d.hits.length === 0){
            this._imagenesService.setError('Oh no! no encontramos ningún resultado');
            this.loading =false;
            return;
          }
          
          this.calcularTotalPaginas = Math.ceil(d.totalHits/this.imagenesPorPagina);
          this.listaImagenes = d.hits;
          this.loading =false;
          
        },
        error: e=>{
          this._imagenesService.setError('Oh no! Occurrio un error con la busqueda');
          this.loading =false;
        }
      })
  }

  paginaSiguiente(){
    this.pagina++;
    this.listaImagenes = [];
    this.loading = true;
    this.obtenerImagenes(false);
    
  }
  paginaAnterior(){
    this.pagina--;
    this.listaImagenes = [];
    this.loading = true;
    this.obtenerImagenes(false);
  }

  ngOnInit(): void {
  }

}
