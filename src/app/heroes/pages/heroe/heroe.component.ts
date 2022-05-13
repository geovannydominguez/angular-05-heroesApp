import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  // inyectar ActivatedRoute y HeroesService
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {

    // Para observar los cambios de la URL.
    // Params genera un Observable.
    // El nombre de estos params se los puede ver en app-routing.module.ts -> LoadChildren: heroes/heroes.module -> HeroesRoutingModule
    // Usando Desestructuracion de Objetos. params['id'] obtengo el id
    this.activatedRoute.params
      .pipe(
        // Dentro el pipe se pueden utilizar operadores de rxjs.
        // El operador switchMap hace un cambio, recibe el valor del 1er Observable y retorna un nuevo Observable
        // Esto reemplaza el codigo comentado de la parte de abajo, es decir, evita tener que suscribirse a un
        // observable dentro de otro observable
        switchMap( ({ id }) => this.heroesService.getHeroe(id) ),
        tap(console.log)
      )
      .subscribe(
        (heroe) => this.heroe = heroe
      );

    
    // this.activatedRoute.params
    //   .subscribe(
    //     ({ id }) => {
    //       console.log(id);

    //       this.heroesService.getHeroe(id)
    //         .subscribe({
    //           next: (heroe) => this.heroe = heroe
    //         });
    //     }
    //   );
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
