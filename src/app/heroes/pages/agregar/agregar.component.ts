import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: ''
  };

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

              
  ngOnInit(): void {

    if ( this.router.url.includes('editar') ) {

      // Para observar los cambios de la URL se utiliza ActivatedRoute.
    // Params genera un Observable.
    // El nombre de estos params se los puede ver en app-routing.module.ts -> LoadChildren: heroes/heroes.module -> HeroesRoutingModule
    // Usando Desestructuracion de Objetos. params['id'] obtengo el id
    this.activatedRoute.params
    .pipe(

      // Dentro el pipe se pueden utilizar operadores de rxjs.
      // El operador switchMap hace un cambio, recibe el valor del 1er Observable y retorna un nuevo Observable
      // Evita tener que suscribirse a un observable dentro de otro observable.
      switchMap( ({ id }) => this.heroesService.getHeroe(id) )
    )
    .subscribe(
      heroe => this.heroe = heroe
    );

    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if ( this.heroe.id ) {
      // Actualizar Héroe
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(
          heroe => this.mostrarSnackBar('Registro Actualizado')
        );
    } else {
      // Crear Héroe
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro Creado');
      });
    }
  }

  eliminarHeroe() {

    const myDialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    } );

    myDialog.afterClosed()
      .subscribe( (result) => {
        if (result) {
          
          this.heroesService.eliminarHeroe(this.heroe.id!)
            .subscribe(
              resp => {
                this.router.navigate(['/heroes']);
              }
            );
            
        }
      }
      );

  }

  mostrarSnackBar( mensaje: string) {

    this._snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });

  }

}
