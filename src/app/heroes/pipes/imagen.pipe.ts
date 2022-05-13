import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'

  // por default es TRUE. Cuando es FALSE el pipe se invoca en cada ciclo de detección de cambios.
  // Consume muchos recursos.
  //,pure: false 

})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe ): string {

    // console.log('Pipe imagen se procesó');

    if ( !heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png';      
    } else if ( heroe.alt_img ) {
      return heroe.alt_img;
    } else {
      return `assets/heroes/${ heroe.id }.jpg`;
    }
  }

}
