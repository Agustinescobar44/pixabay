import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit , OnDestroy{

  texto = ""
  mostrar = false
  suscription: Subscription;

  constructor(private _imagenServicio:ImagenService) { 
    this.suscription = this._imagenServicio.getError().subscribe({
      next:(d)=>{
        this.mostrar = true;
        this.texto=d

        setTimeout(() => {
          this.mostrar = false;
        }, 3000);
          
      }
    });
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.suscription.unsubscribe();
  }

}
