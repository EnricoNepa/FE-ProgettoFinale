import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaClientiComponent } from './components/area-clienti/area-clienti.component';
import { InfoClientiComponent } from './components/clienti/info-clienti/info-clienti.component';
import { ListaClientiComponent } from './components/clienti/lista-clienti/lista-clienti.component';
import { ListaComuniComponent } from './components/comuni/lista-comuni/lista-comuni.component';
import { InfoFattureComponent } from './components/fatture/info-fatture/info-fatture.component';
import { ListaFattureComponent } from './components/fatture/lista-fatture/lista-fatture.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ListaUsersComponent } from './components/user/lista-users/lista-users.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'areaclienti', component: AreaClientiComponent, canActivate:[AuthGuard] },
  { path: 'clienti', component: ListaClientiComponent, canActivate:[AuthGuard] },
  { path: 'clienti/:id', component: InfoClientiComponent, canActivate:[AuthGuard] },
  { path: 'comuni', component: ListaComuniComponent, canActivate:[AuthGuard] },
  { path: 'fatture', component: ListaFattureComponent, canActivate:[AuthGuard] },
  { path: 'users', component: ListaUsersComponent, canActivate:[AuthGuard] },
  { path: 'fatture/:id', component:InfoFattureComponent, canActivate:[AuthGuard] },
  { path: 'fatture/:id/:idCliente', component:InfoFattureComponent, canActivate:[AuthGuard] },
  { path: 'clienti/fatture/:id', component:ListaFattureComponent, canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
