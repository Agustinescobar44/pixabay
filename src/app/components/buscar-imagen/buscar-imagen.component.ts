import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {

  nombreImagen = ""


  constructor(private _imagenesService:ImagenService) { }

  ngOnInit(): void {
  }

  buscarImagenes(){
    if(!this.nombreImagen){
      this._imagenesService.setError("Ingrese el termino a buscar")
      return
    }
    this._imagenesService.setBusqueda(this.nombreImagen)
  }
}
