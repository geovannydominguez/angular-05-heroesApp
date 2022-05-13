import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card {
      margin-top: 20px;
    }
  `]
})
export class HeroeTarjetaComponent {

  // Recibir heroe del componente padre.
  // !. Typescript confia en mi, siempre va a existir un heroe.
  @Input() heroe!: Heroe;

}
