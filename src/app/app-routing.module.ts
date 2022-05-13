import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    // Lazy - Load
    // Cuando alguien entra al path 'auth' entonces cargar sus hijos y estos hijos
    // vienen de auth.module y cuando la Promesa se cargue esto va a regresar AuthModule
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    // Lazy - Load
    // Cuando alguien entra al path 'heroes' entonces cargar sus hijos y estos hijos
    // vienen de heroes.module y cuando la Promesa se cargue esto va a regresar HeroesModule
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
