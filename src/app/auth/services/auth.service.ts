import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        // Pueden existir varios operadores tap. Siempre va a recibir el resultado del tap anterior.
        tap( auth => localStorage.setItem('token', auth.id) )
      );
  }

  logout() {
    this._auth = undefined;
  }

  verificaAutenticacion(): Observable<boolean> {
    
    if ( !localStorage.getItem('token') ) {
      // Con of se crea un Observable
      return of(false);
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        // transformar las cosas
        map( auth => {
          this._auth = auth;
          return true;
         })
      );

  }

}
