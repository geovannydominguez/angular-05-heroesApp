import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Solo restrinje que se pueda CARGAR el módulo. 
  // NO valida si es que se puede ACTIVAR.
  // Es decir, solo canLoad no es suficiente.
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            
            // si no está autenticado, redirigir a login
            if (!estaAutenticado) {
              this.router.navigate(['./auth/login']);
            }

          })
        );

    // si auth.id existe, déjelo pasar
    // if (this.authService.auth.id) {
    //   return true;
    // } else {

    //   console.log('Bloqueado por el AuthGuard - CanLoad');
    //   return false;
    // }

    // TRUE: el usuario SÍ puede entrar a la ruta
    // FALSE: el usuario NO puede entrar a la ruta
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            
            // si no está autenticado, redirigir a login
            if (!estaAutenticado) {
              this.router.navigate(['./auth/login']);
            }

          })
        );

    // // si auth.id existe, déjelo pasar
    // if (this.authService.auth.id) {
    //   return true;
    // } else {

    //   console.log('Bloqueado por el AuthGuard - CanActivate');
    //   return false;
    // }

  }
  
}
